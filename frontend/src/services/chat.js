// import api from "./api";

// export async function createChat() {

//     return api.post("/chat/create");

// }

// export const getChats = () => {

//     return api.get("/chat");
// };

// export async function sendMessage(chatId, content) {

//     return api.post(
//         `/messages/generate_message?chat_id=${chatId}&content=${encodeURIComponent(content)}`
//     );
// }

// export async function getMessages(chatId) {

//     return api.get(`/messages/${chatId}`);

// }