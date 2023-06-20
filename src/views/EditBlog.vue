<template>
    <div class="create-post">
        <BlogCoverPreview v-show="blogPhotoPreview" />
        <Loading v-show="state.loading" />
        <div class="container">
            <div :class="{ invisible: !state.error }" class="err-message">
                <p><span>Error:</span>{{ state.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" id="blog-photo" @change="fileChange($event)" accept=".png, .jpg, ,jpeg" />
                    <button @click="openPreview" class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span><b>File Chosen: </b>{{ blogPhotoName }} </span>
                </div>
            </div>
            <div class="editor">
                <ckeditor :editor="state.editor" v-model="blogHtml" :config="state.editorConfig"></ckeditor>
            </div>
            <div class="blog-actions">
                <router-link :to="{ name: 'BlogPreview' }"><button>Preview</button></router-link>
                <button @click="updateBlog">Save Changes</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { onMounted, reactive, ref } from 'vue';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import db from "../firebase/firebaseinit";

import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from '../components/Loading.vue';
import { useRoute, useRouter } from 'vue-router';

const { blogHtml, blogPhotoFileURL, blogPhotoName, blogPhotoPreview, blogTitle, profileId } = storeToRefs(useStore())
const { createFileURL, fileNameChange, openPhotoPreview ,allBlogCards, setBlogState, getPost, updateEditPost} = useStore() as any;

const route = useRoute();
const router = useRouter();
class MyUploadAdapter {
    loader: any;
    constructor(loader: any) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
                this.Request(file, resolve);
            }));
    }
    Request(file: any, resolve: any) {
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
        docRef.put(file).on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (err) => {
                console.log(err);
            },
            async () => {
                const downloadURL = await docRef.getDownloadURL();
                resolve({
                    default: downloadURL
                });
            }
        );

    }
}



interface State {
    editor: any,
    editorData: string,
    editorConfig: any
    file: null | any,
    error: null | any,
    errorMsg: null | any,
    loading: null | any,
    routeId: null | any,
    currentBlog: null | any,
}

const state: State = reactive({
    editor: ClassicEditor,
    editorData: '<div>Content of the editor.</div>',
    editorConfig: {
        extraPlugins: [MyCustomUploadAdapterPlugin],
    },
    file: null,
    error: null,
    errorMsg: null,
    loading: null,
    routeId: null,
    currentBlog: null
});


function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

async function updateBlog() {
    if (blogTitle && blogHtml) {
        if (state.file) {
            state.loading = true;
            const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/BlogCoverPhotos/${blogPhotoName.value}`);
              docRef.put(state.file).on(
                "state_changed",
                (snapshot) => {
                  console.log(snapshot);
                },
                (err) => {
                  console.log(err);
                  state.loading = false;
                },
                async () => {
                await updatePost(docRef);
            });
            return;
        }
        state.loading = true;
        const dataBase = await db.collection("blogPosts").doc(state.routeId);

        await dataBase.update({
            blogHtml: blogHtml.value,
            blogTitle: blogTitle.value,
        });
        await updateEditPost(state.routeId);
        state.loading = false;
        router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
        return
    }
    state.error = true;
    state.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
    setTimeout(() => {
        state.error = false;
    }, 5000);
    return;
}

async function updatePost(docRef) {
    const downloadURL = await docRef.getDownloadURL();
    const dataBase = await db.collection("blogPosts").doc(state.routeId);

    await dataBase.update({
        blogHtml: blogHtml.value,
        blogCoverPhoto: downloadURL,
        blogPhotoName: blogPhotoName.value,
        blogTitle: blogTitle.value,
    });
    updateEditPost(state.routeId);
    state.loading = false;
    router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });

}

function fileChange($event: any) {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        state.file = target.files[0];
        const fileName = state.file.name;
        fileNameChange(fileName);
        createFileURL(URL.createObjectURL(state.file));
    }


}

function openPreview() {
    openPhotoPreview();
}

onMounted(async()=>{
    state.routeId = route.params.blogid;
    state.currentBlog = await allBlogCards.filter(post=> {
        return post.blogID === state.routeId;
    });
    setBlogState(state.currentBlog[0]);
})
</script>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 0.5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #cb4141;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 20%;
        }

        input {
            transition: 0.5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    @media (max-width: 500px) {
        .upload-file {
            flex-direction: column;

            input {
                margin-top: 10px;
            }

            .preview {
                margin-top: 10px;
            }

            span {
                margin-top: 10px;
            }
        }
    }

    @media (max-width: 800px) {
        .blog-info {
            flex-direction: column;
        }

        .upload-file {
            margin-top: 10px;

        }
    }

    .ck-editor__editable_inline {
        height: 50vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top: 32px;
        display: flex;

        button {
            margin-right: 16px;
        }
    }

    @media (max-width: 500px) {
        .blog-actions {
            flex-direction: column;

            button {
                margin-top: 10px;
            }
        }
    }
}</style>