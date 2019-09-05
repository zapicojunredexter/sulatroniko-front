const manuscriptsStore = store => store.manuscriptsStore;

const userStore = store => store.userStore;

export const getOwnManuscripts = store => {
    try {
        const { uid } = userStore(store);
        const { manuscripts } = manuscriptsStore(store);

        return manuscripts.filter(manuscript => manuscript.authorId === uid && !manuscript.deleted);
    } catch (err) {
        console.error(err);
        return [];
    }
}


export const getPublicManuscripts = store => {
    try {
        // const { uid } = userStore(store);
        const { manuscripts } = manuscriptsStore(store);

        return manuscripts.filter(manuscript => !!manuscript);
    } catch (err) {
        console.error(err);
        return [];
    }
}

