import React, { FC, ReactNode } from "react";

import { INavProps } from "$types/INavProps";
import { Title1 } from "components/Texts";
import { KeyboardUsingScreen } from "components/KeyboardUsingScreen";
import { Appbar, Paragraph } from "react-native-paper";
import { useCurrentTheme } from "$hooks/theme";
import { dp, sp } from "$utils/px2dp";

export interface ISingleInput extends INavProps {
	title: string;
	subtitle?: string;
	fieldCompo: ReactNode;
}

export const SingleInput: FC<ISingleInput> = ({
	title = "",
	subtitle = "",
	fieldCompo: FieldCompo,
	navigation,
}) => {
	const { secondaryText, accent, placeholder } = useCurrentTheme().colors;

	return (
		<KeyboardUsingScreen keyboardShouldPersistTaps="always">
			<Appbar style={{ elevation: 0 }}>
				<Appbar.Action
					icon="chevron-left"
					color={accent}
					size={dp(100)}
					style={{ right: dp(25), top: dp(25) }}
					onPress={() => navigation.goBack()}
				/>
			</Appbar>
			<Title1
				style={{
					color: secondaryText,
					marginLeft: dp(50),
					fontSize: sp(130),
					fontWeight: "normal",
					marginBottom: dp(30),
				}}
			>
				{title}
			</Title1>
			{subtitle ? (
				<Paragraph style={{ marginLeft: dp(50), color: placeholder }}>
					{subtitle}
				</Paragraph>
			) : null}
			{FieldCompo}
		</KeyboardUsingScreen>
	);
};
