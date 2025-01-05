import React, { createContext, useContext, useState } from "react";

const ConversationContext = createContext<any>(null);

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversationData, setConversationData] = useState<any>(null);

  return (
    <ConversationContext.Provider value={{ conversationData, setConversationData }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
