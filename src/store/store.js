import { defineStore } from "pinia";
export const useStore = defineStore('store', {
    state: () => ({
        BlogCards: [
            { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2023"},
            { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 2, 2023" },
            { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 3, 2023" },
            { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 4, 2023" },{ blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2023"},
            { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 2, 2023" },
            { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 3, 2023" },
            { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 4, 2023" },
        ],
        BlogCardsEdit: false,
        isprofileAdmin: true
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
	}
})