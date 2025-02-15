import { Dimensions } from "react-native";

export const {width} = Dimensions.get('window');
export const CARD_WIDTH = width * 0.465;
export const CARD_HEIGHT = CARD_WIDTH * 1.2;

export const scale = width / 375;
export const scaledFontSize = size => size * scale;