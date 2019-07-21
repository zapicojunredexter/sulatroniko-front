const threadsStore = store => store.threadsStore;

const userStore = store => store.userStore;

export const getThreads = store => {
    try {
        const { uid } = userStore(store);
        const { threads, contacts } = threadsStore(store);
        
        const threadsWithMembers = threads.map(thread => {
            const participants = thread.memberIds.map(memberId => contacts[memberId]);
            const threadDisplayable = participants.find(participant => participant && participant.id !== uid);
            const messages = thread.messages.map(message => {
                const files = message.fileUrls.map((file, index) => {
                    return {
                        fileName: `file-${index + 1}`,
                        filePath: file
                    }
                });
                return {
                    isOwn: uid === message.userId,
                    files,
                    ...message,
                }
            });
            return {
                ...thread,
                threadDisplayable,
                participants,
                messages,
            };
        });
        // return manuscripts.filter(manuscript => manuscript.authorId === uid);
        return threadsWithMembers;
    } catch (err) {
        console.error(err);
        return [];
    }
}