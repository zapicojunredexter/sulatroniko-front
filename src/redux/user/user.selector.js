const userStore = store => store.userStore;

export const hasProfileDetails = store => {
    try {
        const { user } = userStore(store);

        return !!user;
    } catch (err) {
        console.error(err);
        return [];
    }
}