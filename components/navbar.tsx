import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextStyle,
} from "react-native";

import {  Link} from "expo-router";


const INACTIVITY_TIMEOUT = 5000; // 5 seconds

export const NAV_ITEMS = [
  { label: "Saved", route: "/saved-properties", icon: "♡" },
  { label: "Home", route: "/", icon: "⌂" },
  { label: "Assistant", route: "/assistant", icon: "✦" },
] as const;



export default function BottomNav() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCollapsed(true);
        }, INACTIVITY_TIMEOUT);
        return () => clearTimeout(timer);
    }, [isCollapsed]);


    return (
        <>
            
            {isCollapsed ? (
                <Pressable 
                    onPress={() => setIsCollapsed(false)}
                    className=" absolute bottom-2 self-center z-50 items-center justify-center rounded-2xl bg-gray-300 active:bg-gray-400"
                >
                    <Text className="text-gray-500  items-center justify-center pl-4" style={{ letterSpacing: 16 } as TextStyle}>NAVBAR</Text>
                </Pressable>
            

             ):(
            <View className="absolute bottom-0 left-0 right-0 z-50 flex-row items-center justify-around rounded-2xl bg-gray-300  shadow-md">
                {NAV_ITEMS.map((item) => (
                    <Link
                        href={item.route}
                        className="flex flex-col items-center justify-center gap-0 rounded-lg"
                        key={item.route}
                    >
                    <Text className="text-2xl">{item.icon}</Text>
                    <Text className="text-2xs text-gray-600 -mt-0.5 mb-1">{item.label}</Text>
                    </Link>
                ))}
            </View>
             )}
            
        </>
    );
    
}