/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useRef, useState } from 'react';
import { chatApi, userApi } from '../../../insolve-framework';
import {
  MessageType,
  TChatMessage,
  TChatMessageExtended,
  TRoom,
} from '../../../types/chatTypes.js';
import { useSelector } from 'react-redux';
import { selecteSocketActive } from '../../../store/slices/appSlice.js';

export const useChat = () => {
  const socketActive = useSelector(selecteSocketActive);
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [messages, setMessages] = useState<TChatMessageExtended[]>([]);
  const [_, setTotalUsers] = useState(0); // TODO: can we get rid of totalUsers
  const [userCount, setUsersCount] = useState(0); // TODO: can we get rid of totalUsers
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [__, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const roomsRef = useRef(rooms);
  roomsRef.current = rooms;

  const selectedRoomRef = useRef(selectedRoom);
  selectedRoomRef.current = selectedRoom;

  function send(message: string) {
    if (!message || !message.trim()) return;
    return chatApi.sendMessage({ message });
  }

  useEffect(() => {
    // function changeRoom(room: TRoom) {
    //   if (selectedRoomRef.current === room) return;
    //   chatApi.joinRoom(room);
    // }

    if (!socketActive) return;

    function onConnected() {
      setConnected(true);
    }

    function onConnectError() {
      setConnected(false);
      setLoading(false);
    }

    function onRoomList(data: { rooms: TRoom[]; totalUsers: number }) {
      setRooms(data.rooms);
      setTotalUsers(data.totalUsers);
    }

    function onJoinedRoom(data: {
      id: number;
      msgs: TChatMessage[];
      name: string;
    }) {
      const msgs: TChatMessageExtended[] = [];

      data.msgs.forEach((message) => {
        if (!chatApi.isMuted(message.user?.steamid)) {
          msgs.push({
            ...message,
            isNew: false,
          });
        }
      });

      setLoading(false);
      setSelectedRoom(data.id);
      setLoading(false);
      setMessages(msgs);
    }

    function onUpdateRoomUserCount(data: { users: any[]; totalUsers: number }) {
      // const newRooms = [...roomsRef.current];

      // for (const i in data.users) {
      //   if (newRooms[i]) {
      //     newRooms[i] = {
      //       ...newRooms[i],
      //       users: data.users[i],
      //     };
      //   }
      // }

      // setRooms(newRooms);
      setTotalUsers(data.totalUsers);
    }

    function onUpdateTotalUserCount(data: { count: number }) {
      setTotalUsers(data.count);
    }

    function onMessage(data: any, isUser = false) {
      const msgs = [...messagesRef.current];

      if (isUser) {
        // user only
        if (chatApi.isMuted(data.user.steamid)) return;

        msgs.push({
          type: data.type || MessageType.User,
          content: data.content,
          user: data.user,
          data: data.data,
        } as any);
      } else {
        // system only
        msgs.push({
          type: MessageType.System,
          content: data.content,
          msgType: data.type,
        } as any);
      }

      if (msgs.length > 25) {
        msgs.shift();
      }

      msgs[msgs.length - 1] = {
        ...msgs[msgs.length - 1],
        isNew: true,
      };

      setMessages(msgs);
    }

    function onUserCountChange(data: { count: number }) {
      setUsersCount(data.count);
    }

    chatApi.on('system message', (data: any) => onMessage(data, false));
    chatApi.on('message', (data: any) => onMessage(data, true));
    chatApi.on('connected', onConnected);
    chatApi.on('connection error', onConnectError);
    chatApi.on('room list', onRoomList);
    chatApi.on('joined room', onJoinedRoom);
    chatApi.on('update room user count', onUpdateRoomUserCount);
    chatApi.on('update total user count', onUpdateTotalUserCount);

    userApi.on('user-count-change', onUserCountChange);

    return () => {
      chatApi.off('connected', onConnected);
      chatApi.off('connection error', onConnectError);
      chatApi.off('room list', onRoomList);
      chatApi.off('joined room', onJoinedRoom);
      chatApi.off('update room user count', onUpdateRoomUserCount);
      chatApi.off('update total user count', onUpdateTotalUserCount);
      userApi.off('user-count-change', onUserCountChange);
    };
  }, [socketActive]);

  return {
    messages,
    userCount,
    send,
    loading,
  };
};
