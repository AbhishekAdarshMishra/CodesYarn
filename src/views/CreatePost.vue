<template>
    <div class="create-post">
        <div class="container">
            <div v-html="state.editorData">
            </div>
            <div>{{ state.editorData }}
            </div>
            <div class="editor">
                <ckeditor :editor="state.editor" v-model="state.editorData" :config="state.editorConfig"></ckeditor>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { reactive } from 'vue';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

class MyUploadAdapter {
    loader: any;
    constructor(loader: any) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file
            .then((file:any) => new Promise((resolve, reject) => {
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
}

const state: State = reactive({
    editor: ClassicEditor,
    editorData: '<div>Content of the editor.</div>',
    editorConfig: {
        // plugins: [Base64UploadAdapter ],
        extraPlugins: [MyCustomUploadAdapterPlugin],
    }
});

// function uploader(editor) {
//     editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
//                         return new CustomUploadAdapter( loader );
//     };
// }
function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}
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
        background-color: #303030;
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
            min-width: 300px;
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

    .editor {
        height: 60vh;
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

        button {
            margin-right: 16px;
        }
    }
}
</style>