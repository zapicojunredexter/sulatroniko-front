const copywriterStore = store => store.copywriterStore;

const myid = store => store.userStore.uid;

const userStore = store => store.userStore;

export const getMyCopywriters = store => {
    try {
        const myId = myid(store);
        const { copywriters } = copywriterStore(store);
        return copywriters.filter(copywriter => copywriter.publisherId === myId);
    } catch (err) {
        console.error(err);
        return [];
    }
}