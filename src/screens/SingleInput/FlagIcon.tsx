import React, { FC, useEffect, useState } from "react";
import { IsoCodes } from "screens/SingleInput/countries";
import { SvgXml } from "react-native-svg";

interface IFlagIcon {
	/**
	 * country isoCode (aplha2code)
	 */
	isoCode: IsoCodes;
	/**
	 * width of icon
	 * height will be autmatically calculated by aspectRatio 4:3
	 */
	width: number;
}

const locationSvg = `<svg viewBox="0 0 94.62 120.1" fill="#FF5959"><path d="M47.31 0C21.18 0 0 21.18 0 47.31c0 25.52 28.18 53.36 46.04 72.23.7.74 1.83.74 2.53 0 17.86-18.87 46.04-46.72 46.04-72.23C94.62 21.18 73.44 0 47.31 0zm.35 70.07c-12.57 0-22.76-10.19-22.76-22.76s10.19-22.76 22.76-22.76c12.57 0 22.76 10.19 22.76 22.76S60.23 70.07 47.66 70.07z"/></svg>`;

const FlagIcon: FC<IFlagIcon> = ({ isoCode, width }) => {
	const aspectRatio = 4 / 3;
	const height = width / aspectRatio;
	const flagsUri =
	"https://raw.githubusercontent.com/lipis/flag-icons/4055e1a66f6ac3d5238ab353189d14452821e9be/flags/4x3/";
	
	const [svgXml, setSvgXml] = useState(locationSvg);
	useEffect(() => {
		const countryFlagUri = flagsUri + isoCode.toLocaleLowerCase() + ".svg";
		async function getSvgXml() {
			try {
				setSvgXml(locationSvg);
				const res = await fetch(countryFlagUri);
				// console.log(countryFlagUri);
				const svgXml = await res.text();
				svgXml.replace(`<svg `, `<svg width="${width}" height="${height}" `);

				setSvgXml(svgXml);
			} catch (err) {
				console.error(err);
			}
		}
		getSvgXml();
	}, [isoCode]);

	return <SvgXml xml={svgXml} height={height} width={width} />;
};

export default FlagIcon;
