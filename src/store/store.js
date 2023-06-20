import { defineStore } from "pinia";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import db from "../firebase/firebaseinit";
export const useStore = defineStore('store', {
    state: () => ({
        BlogCards: [
            { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2023"},
            { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 2, 2023" },
            { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 3, 2023" },
            { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 4, 2023" },
            { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2023"},
            { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 2, 2023" },
            { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 3, 2023" },
            { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 4, 2023" },
        ],
        BlogCardsEdit: false,
        isprofileAdmin: false,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null,

        blogHtml: "Write your blog title here...",
        blogTitle: "",
        blogPhotoName:"",
        blogPhotoFileURL: null,
        blogPhotoPreview: false,

    }),
    getters: {
		allBlogCards: (state) => {
            return state.BlogCards;
        }
	},
    actions: {
		toggleBlogCardsEdit(task) {
            this.BlogCardsEdit = task;
        },
        updateUser(payload) {
            this.user = payload;
        },
        setProfileInfo(doc) {
            this.profileId = doc.id;
            this.profileEmail = doc.data().email;
            this.profileFirstName = doc.data().firstName;
            this.profileLastName = doc.data().lastName;
            this.profileUsername = doc.data().username;
            this.isprofileAdmin = doc.data().admin;
        },
        setProfileInitials() {
            this.profileInitials = this.profileFirstName.match(/(\b\S)?/g).join("") + this.profileLastName.match(/(\b\S)?/g).join("");
        },
        fileNameChange( payload) {
            this.blogPhotoName = payload;
        },
        createFileURL( payload) {
            this.blogPhotoFileURL = payload;
        },
        openPhotoPreview() {
            this.blogPhotoPreview = !this.blogPhotoPreview;
        },

        // ----------------------Firebase------------------
        async getCurrentUser() {
            const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
            const dbResults = await dataBase.get();
            this.setProfileInfo(dbResults);
            this.setProfileInitials();
        },
        async updateUserSettings() {
            db.collection("users").doc(this.profileId).update({
                firstName: this.profileFirstName,
                lastName: this.profileLastName,
                username: this.profileUsername,
            }).then(()=>{
                this.setProfileInitials();
            })
        },
        async updateAdminAccess(email) {
            db.collection("users").get().then(function(snapshot) {
                snapshot.docs.forEach(function(childSnapshot) {
                    db.collection("users").doc(childSnapshot.id).get().then((user)=>{
                        const chk = user.data().email
                    if(chk===email) {
                        const userId = childSnapshot.id;
                        db.collection("users").doc(userId).update({
                            admin: true
                        })
                    }
                  });
                })
            });
        }
	}
})