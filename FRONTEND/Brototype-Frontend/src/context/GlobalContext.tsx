import React from "react";
import { boolean } from "yup";


interface Action {
  type: string;
  payload: any; // Replace 'any' with the actual type of your payload
}
interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (index: number) => void;
  daySelected: any; // Change the type according to your needs
  setDaySelected: (day: any) => void;
  showEventModal: boolean;
  setShowEventModal: (show: boolean) => void;
  dispatchCalEvent: ({ type, payload }: Action) => void;
  savedEvents: any[]; // Change the type according to your needs
  selectedEvent: any; // Change the type according to your needs
  setSelectedEvent: (event: any) => void;
  dates: any[]; // Change the type according to your needs
  setDates: (dates: any[]) => void;
  dayId: any[]; // Change the type according to your needs
  setDayId: (ids: any[]) => void;
  customType: any; // Change the type according to your needs
  setCustomType: (type: any) => void;
  selectedCustomWeek: any[]; // Change the type according to your needs
  setSelectedCustomWeek: (week: any[]) => void;
  chatId: string;
  setChatId: (id: string) => void; // Change the argument type to string
  isOnline : any[],
  setIsOnline: () => void;
  declareSocket : any,
  setDeclareSocket : () => void;
  unreadReload: boolean; // Adjusted type to boolean
  setUnreadReload: (reload: boolean) => void; // Adjusted type to boolean
  clicked: boolean
  setClicked : (clicked: boolean) => void;
  clickedChaterId : string;
  setClickedChaterId : (clicked:string) => void
}
const GlobalContext = React.createContext<GlobalContextType>({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  dates: [],
  setDates: () => {},
  dayId: [],
  setDayId: () => {},
  customType: null,
  setCustomType: () => {},
  selectedCustomWeek: [],
  setSelectedCustomWeek: () => {},
  chatId: "",
  setChatId: () => {}, // Adjusted to accept a string argument
  isOnline: [],
  setIsOnline : () => {},
  declareSocket : null,
  setDeclareSocket : () => {},
  unreadReload : false,
  setUnreadReload:() => {},
  clicked:false,
  setClicked:()=>{},
  clickedChaterId:"",
  setClickedChaterId:()=>{}
});

export default GlobalContext;
