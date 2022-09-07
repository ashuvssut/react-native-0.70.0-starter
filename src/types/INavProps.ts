import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface INavProps {
	navigation: NativeStackNavigationProp<ParamListBase, string>;
	route?: RouteProp<ParamListBase, string>;
}
