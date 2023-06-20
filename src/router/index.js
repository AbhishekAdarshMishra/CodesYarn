import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import BlogPreview from "../views/BlogPreview.vue";
import { createRouter, createWebHistory } from "vue-router";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseinit"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs",
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false
    }
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: {
      title: "ForgetPassword",
      requiresAuth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/createPost",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "CreatePost",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "BlogPreview",
      requiresAuth: true,
      requiresAdmin: true
    },
  },
  {
    path: "/view-blog:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "ViewBlog",
      requiresAuth: false
    },
  },
  {
    path: "/edit-blog:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "EditBlog",
      requiresAuth: true,
      requiresAdmin: true
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) =>{
  document.title = `${to.meta.title} | CodesYarn`;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    const id = token.claims.user_id;
    await db.collection("users").doc(id).get().then((user) => {
      admin = user.data().admin
    });
    
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
