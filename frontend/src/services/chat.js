import api from "./api";

export const renameChat = (chatId, title) => {
    return api.put(
        `/chat/${chatId}`,
        {
            title 
        }
    );
};

export const deleteChat = (chatId) => {
    return api.delete(`/chat/${chatId}`);
};