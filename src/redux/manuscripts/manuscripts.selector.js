const manuscriptsStore = store => store.manuscriptsStore;

const userStore = store => store.userStore;

export const getOwnManuscripts = store => {
    try {
        const { uid } = userStore(store);
        const { manuscripts } = manuscriptsStore(store);

        return manuscripts.filter(manuscript => manuscript.authorId === uid);
    } catch (err) {
        console.error(err);
        return [];
    }
}