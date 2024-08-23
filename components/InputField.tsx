import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}: InputFieldProps) => {
  const [isShow, setIsShow] = useState(secureTextEntry || false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-1 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle} `}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              secureTextEntry={isShow}
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle}`}
              {...props}
            />
            <TouchableOpacity onPress={() => setIsShow((prev) => !prev)}>
              {label === "Password" &&
                (isShow ? (
                  <Image
                    source={icons.eyecross}
                    className={`w-6 h-6 mr-4 ${iconStyle}`}
                  />
                ) : (
                  <Image
                    source={icons.close}
                    className={`w-6 h-6 mr-4 ${iconStyle}`}
                  />
                ))}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
