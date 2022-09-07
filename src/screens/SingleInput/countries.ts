/** Update countries array list using the GraphQL query link below
 * Ref: https://graphql.country/
 * Query GraphQL: https://graphql.country/graphql#query=%7B%0A%20%20countries%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20alpha2Code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%23%20alpha3Code%0A%20%20%20%20%20%20%20%20callingCodes%0A%20%20%20%20%20%20%20%20
 */

/** [Cleaning the retireved data] After querying, copy the "edges" array and paste it in data variable as an object (i.e replace [] with {}). Follow the following steps to clean the data
 * Search for these 2 codeblocks given below and delete all of their occurance
```#1
	{
		node: {
			alpha2Code: 
```
```#2

```


 * Search for this codeblock given below 
```
,
			name
```
and replace all of their occurances with ":{name"


Now format it

*/

const data = {
	AL: {
		name: "Albania",
		callingCodes: ["355"],
	},
	BZ: {
		name: "Belize",
		callingCodes: ["501"],
	},
	DZ: {
		name: "Algeria",
		callingCodes: ["213"],
	},
	AD: {
		name: "Andorra",
		callingCodes: ["376"],
	},
	AO: {
		name: "Angola",
		callingCodes: ["244"],
	},
	AI: {
		name: "Anguilla",
		callingCodes: ["1264"],
	},
	AQ: {
		name: "Antarctica",
		callingCodes: ["672"],
	},
	AG: {
		name: "Antigua and Barbuda",
		callingCodes: ["1268"],
	},
	AR: {
		name: "Argentina",
		callingCodes: ["54"],
	},
	AX: {
		name: "Åland Islands",
		callingCodes: ["358"],
	},
	AT: {
		name: "Austria",
		callingCodes: ["43"],
	},
	AZ: {
		name: "Azerbaijan",
		callingCodes: ["994"],
	},
	AW: {
		name: "Aruba",
		callingCodes: ["297"],
	},
	BS: {
		name: "Bahamas",
		callingCodes: ["1242"],
	},
	BH: {
		name: "Bahrain",
		callingCodes: ["973"],
	},
	AU: {
		name: "Australia",
		callingCodes: ["61"],
	},
	BD: {
		name: "Bangladesh",
		callingCodes: ["880"],
	},
	BB: {
		name: "Barbados",
		callingCodes: ["1246"],
	},
	BY: {
		name: "Belarus",
		callingCodes: ["375"],
	},
	BE: {
		name: "Belgium",
		callingCodes: ["32"],
	},
	BQ: {
		name: "Bonaire, Sint Eustatius and Saba",
		callingCodes: ["5997"],
	},
	BW: {
		name: "Botswana",
		callingCodes: ["267"],
	},
	BR: {
		name: "Brazil",
		callingCodes: ["55"],
	},
	IO: {
		name: "British Indian Ocean Territory",
		callingCodes: ["246"],
	},
	KY: {
		name: "Cayman Islands",
		callingCodes: ["1345"],
	},
	BT: {
		name: "Bhutan",
		callingCodes: ["975"],
	},
	BM: {
		name: "Bermuda",
		callingCodes: ["1441"],
	},
	BV: {
		name: "Bouvet Island",
		callingCodes: [""],
	},
	BN: {
		name: "Brunei Darussalam",
		callingCodes: ["673"],
	},
	BG: {
		name: "Bulgaria",
		callingCodes: ["359"],
	},
	BF: {
		name: "Burkina Faso",
		callingCodes: ["226"],
	},
	KH: {
		name: "Cambodia",
		callingCodes: ["855"],
	},
	VI: {
		name: "Virgin Islands (U.S.)",
		callingCodes: ["1 340"],
	},
	CM: {
		name: "Cameroon",
		callingCodes: ["237"],
	},
	BI: {
		name: "Burundi",
		callingCodes: ["257"],
	},
	CA: {
		name: "Canada",
		callingCodes: ["1"],
	},
	CV: {
		name: "Cabo Verde",
		callingCodes: ["238"],
	},
	CX: {
		name: "Christmas Island",
		callingCodes: ["61"],
	},
	CC: {
		name: "Cocos (Keeling) Islands",
		callingCodes: ["61"],
	},
	CO: {
		name: "Colombia",
		callingCodes: ["57"],
	},
	KM: {
		name: "Comoros",
		callingCodes: ["269"],
	},
	CL: {
		name: "Chile",
		callingCodes: ["56"],
	},
	CG: {
		name: "Congo",
		callingCodes: ["242"],
	},
	CN: {
		name: "China",
		callingCodes: ["86"],
	},
	CK: {
		name: "Cook Islands",
		callingCodes: ["682"],
	},
	TD: {
		name: "Chad",
		callingCodes: ["235"],
	},
	CW: {
		name: "Curaçao",
		callingCodes: ["599"],
	},
	CY: {
		name: "Cyprus",
		callingCodes: ["357"],
	},
	CZ: {
		name: "Czech Republic",
		callingCodes: ["420"],
	},
	HR: {
		name: "Croatia",
		callingCodes: ["385"],
	},
	DK: {
		name: "Denmark",
		callingCodes: ["45"],
	},
	CU: {
		name: "Cuba",
		callingCodes: ["53"],
	},
	DJ: {
		name: "Djibouti",
		callingCodes: ["253"],
	},
	DM: {
		name: "Dominica",
		callingCodes: ["1767"],
	},
	DO: {
		name: "Dominican Republic",
		callingCodes: ["1809", "1829", "1849"],
	},
	EC: {
		name: "Ecuador",
		callingCodes: ["593"],
	},
	ER: {
		name: "Eritrea",
		callingCodes: ["291"],
	},
	EE: {
		name: "Estonia",
		callingCodes: ["372"],
	},
	ET: {
		name: "Ethiopia",
		callingCodes: ["251"],
	},
	FK: {
		name: "Falkland Islands (Malvinas)",
		callingCodes: ["500"],
	},
	FO: {
		name: "Faroe Islands",
		callingCodes: ["298"],
	},
	GQ: {
		name: "Equatorial Guinea",
		callingCodes: ["240"],
	},
	FJ: {
		name: "Fiji",
		callingCodes: ["679"],
	},
	FI: {
		name: "Finland",
		callingCodes: ["358"],
	},
	GL: {
		name: "Greenland",
		callingCodes: ["299"],
	},
	TF: {
		name: "French Southern Territories",
		callingCodes: [""],
	},
	GA: {
		name: "Gabon",
		callingCodes: ["241"],
	},
	GE: {
		name: "Georgia",
		callingCodes: ["995"],
	},
	DE: {
		name: "Germany",
		callingCodes: ["49"],
	},
	GF: {
		name: "French Guiana",
		callingCodes: ["594"],
	},
	GH: {
		name: "Ghana",
		callingCodes: ["233"],
	},
	GM: {
		name: "Gambia",
		callingCodes: ["220"],
	},
	GI: {
		name: "Gibraltar",
		callingCodes: ["350"],
	},
	GR: {
		name: "Greece",
		callingCodes: ["30"],
	},
	GT: {
		name: "Guatemala",
		callingCodes: ["502"],
	},
	GG: {
		name: "Guernsey",
		callingCodes: ["44"],
	},
	GN: {
		name: "Guinea",
		callingCodes: ["224"],
	},
	GY: {
		name: "Guyana",
		callingCodes: ["592"],
	},
	GP: {
		name: "Guadeloupe",
		callingCodes: ["590"],
	},
	HT: {
		name: "Haiti",
		callingCodes: ["509"],
	},
	GU: {
		name: "Guam",
		callingCodes: ["1671"],
	},
	HM: {
		name: "Heard Island and McDonald Islands",
		callingCodes: [""],
	},
	VA: {
		name: "Holy See",
		callingCodes: ["379"],
	},
	HN: {
		name: "Honduras",
		callingCodes: ["504"],
	},
	IN: {
		name: "India",
		callingCodes: ["91"],
	},
	CI: {
		name: "Côte d'Ivoire",
		callingCodes: ["225"],
	},
	IR: {
		name: "Iran (Islamic Republic of)",
		callingCodes: ["98"],
	},
	IQ: {
		name: "Iraq",
		callingCodes: ["964"],
	},
	HU: {
		name: "Hungary",
		callingCodes: ["36"],
	},
	IE: {
		name: "Ireland",
		callingCodes: ["353"],
	},
	IS: {
		name: "Iceland",
		callingCodes: ["354"],
	},
	IM: {
		name: "Isle of Man",
		callingCodes: ["44"],
	},
	IL: {
		name: "Israel",
		callingCodes: ["972"],
	},
	IT: {
		name: "Italy",
		callingCodes: ["39"],
	},
	PW: {
		name: "Palau",
		callingCodes: ["680"],
	},
	KZ: {
		name: "Kazakhstan",
		callingCodes: ["76", "77"],
	},
	KE: {
		name: "Kenya",
		callingCodes: ["254"],
	},
	KI: {
		name: "Kiribati",
		callingCodes: ["686"],
	},
	KW: {
		name: "Kuwait",
		callingCodes: ["965"],
	},
	KG: {
		name: "Kyrgyzstan",
		callingCodes: ["996"],
	},
	LA: {
		name: "Lao People's Democratic Republic",
		callingCodes: ["856"],
	},
	JO: {
		name: "Jordan",
		callingCodes: ["962"],
	},
	LV: {
		name: "Latvia",
		callingCodes: ["371"],
	},
	JP: {
		name: "Japan",
		callingCodes: ["81"],
	},
	LY: {
		name: "Libya",
		callingCodes: ["218"],
	},
	LI: {
		name: "Liechtenstein",
		callingCodes: ["423"],
	},
	LT: {
		name: "Lithuania",
		callingCodes: ["370"],
	},
	LU: {
		name: "Luxembourg",
		callingCodes: ["352"],
	},
	MO: {
		name: "Macao",
		callingCodes: ["853"],
	},
	LS: {
		name: "Lesotho",
		callingCodes: ["266"],
	},
	MG: {
		name: "Madagascar",
		callingCodes: ["261"],
	},
	LR: {
		name: "Liberia",
		callingCodes: ["231"],
	},
	MW: {
		name: "Malawi",
		callingCodes: ["265"],
	},
	MT: {
		name: "Malta",
		callingCodes: ["356"],
	},
	MQ: {
		name: "Martinique",
		callingCodes: ["596"],
	},
	MR: {
		name: "Mauritania",
		callingCodes: ["222"],
	},
	MU: {
		name: "Mauritius",
		callingCodes: ["230"],
	},
	MV: {
		name: "Maldives",
		callingCodes: ["960"],
	},
	YT: {
		name: "Mayotte",
		callingCodes: ["262"],
	},
	ML: {
		name: "Mali",
		callingCodes: ["223"],
	},
	MX: {
		name: "Mexico",
		callingCodes: ["52"],
	},
	FM: {
		name: "Micronesia (Federated States of)",
		callingCodes: ["691"],
	},
	MD: {
		name: "Moldova (Republic of)",
		callingCodes: ["373"],
	},
	MS: {
		name: "Montserrat",
		callingCodes: ["1664"],
	},
	MA: {
		name: "Morocco",
		callingCodes: ["212"],
	},
	MM: {
		name: "Myanmar",
		callingCodes: ["95"],
	},
	NA: {
		name: "Namibia",
		callingCodes: ["264"],
	},
	MN: {
		name: "Mongolia",
		callingCodes: ["976"],
	},
	NR: {
		name: "Nauru",
		callingCodes: ["674"],
	},
	ME: {
		name: "Montenegro",
		callingCodes: ["382"],
	},
	NP: {
		name: "Nepal",
		callingCodes: ["977"],
	},
	NL: {
		name: "Netherlands",
		callingCodes: ["31"],
	},
	NC: {
		name: "New Caledonia",
		callingCodes: ["687"],
	},
	NG: {
		name: "Nigeria",
		callingCodes: ["234"],
	},
	NU: {
		name: "Niue",
		callingCodes: ["683"],
	},
	NF: {
		name: "Norfolk Island",
		callingCodes: ["672"],
	},
	MP: {
		name: "Northern Mariana Islands",
		callingCodes: ["1670"],
	},
	NE: {
		name: "Niger",
		callingCodes: ["227"],
	},
	NO: {
		name: "Norway",
		callingCodes: ["47"],
	},
	NI: {
		name: "Nicaragua",
		callingCodes: ["505"],
	},
	OM: {
		name: "Oman",
		callingCodes: ["968"],
	},
	PK: {
		name: "Pakistan",
		callingCodes: ["92"],
	},
	PY: {
		name: "Paraguay",
		callingCodes: ["595"],
	},
	PE: {
		name: "Peru",
		callingCodes: ["51"],
	},
	PH: {
		name: "Philippines",
		callingCodes: ["63"],
	},
	PG: {
		name: "Papua New Guinea",
		callingCodes: ["675"],
	},
	PN: {
		name: "Pitcairn",
		callingCodes: ["64"],
	},
	PA: {
		name: "Panama",
		callingCodes: ["507"],
	},
	PL: {
		name: "Poland",
		callingCodes: ["48"],
	},
	PT: {
		name: "Portugal",
		callingCodes: ["351"],
	},
	PR: {
		name: "Puerto Rico",
		callingCodes: ["1787", "1939"],
	},
	QA: {
		name: "Qatar",
		callingCodes: ["974"],
	},
	RW: {
		name: "Rwanda",
		callingCodes: ["250"],
	},
	SH: {
		name: "Saint Helena, Ascension and Tristan da Cunha",
		callingCodes: ["290"],
	},
	KN: {
		name: "Saint Kitts and Nevis",
		callingCodes: ["1869"],
	},
	LC: {
		name: "Saint Lucia",
		callingCodes: ["1758"],
	},
	SG: {
		name: "Singapore",
		callingCodes: ["65"],
	},
	BL: {
		name: "Saint Barthélemy",
		callingCodes: ["590"],
	},
	RE: {
		name: "Réunion",
		callingCodes: ["262"],
	},
	RO: {
		name: "Romania",
		callingCodes: ["40"],
	},
	SM: {
		name: "San Marino",
		callingCodes: ["378"],
	},
	SA: {
		name: "Saudi Arabia",
		callingCodes: ["966"],
	},
	VC: {
		name: "Saint Vincent and the Grenadines",
		callingCodes: ["1784"],
	},
	SN: {
		name: "Senegal",
		callingCodes: ["221"],
	},
	RS: {
		name: "Serbia",
		callingCodes: ["381"],
	},
	WS: {
		name: "Samoa",
		callingCodes: ["685"],
	},
	SC: {
		name: "Seychelles",
		callingCodes: ["248"],
	},
	ST: {
		name: "Sao Tome and Principe",
		callingCodes: ["239"],
	},
	SL: {
		name: "Sierra Leone",
		callingCodes: ["232"],
	},
	SB: {
		name: "Solomon Islands",
		callingCodes: ["677"],
	},
	ZA: {
		name: "South Africa",
		callingCodes: ["27"],
	},
	GS: {
		name: "South Georgia and the South Sandwich Islands",
		callingCodes: ["500"],
	},
	KR: {
		name: "Korea (Republic of)",
		callingCodes: ["82"],
	},
	SK: {
		name: "Slovakia",
		callingCodes: ["421"],
	},
	SS: {
		name: "South Sudan",
		callingCodes: ["211"],
	},
	SI: {
		name: "Slovenia",
		callingCodes: ["386"],
	},
	ES: {
		name: "Spain",
		callingCodes: ["34"],
	},
	LK: {
		name: "Sri Lanka",
		callingCodes: ["94"],
	},
	SZ: {
		name: "Swaziland",
		callingCodes: ["268"],
	},
	SR: {
		name: "Suriname",
		callingCodes: ["597"],
	},
	SE: {
		name: "Sweden",
		callingCodes: ["46"],
	},
	SJ: {
		name: "Svalbard and Jan Mayen",
		callingCodes: ["4779"],
	},
	SY: {
		name: "Syrian Arab Republic",
		callingCodes: ["963"],
	},
	TW: {
		name: "Taiwan",
		callingCodes: ["886"],
	},
	TJ: {
		name: "Tajikistan",
		callingCodes: ["992"],
	},
	CH: {
		name: "Switzerland",
		callingCodes: ["41"],
	},
	TZ: {
		name: "Tanzania, United Republic of",
		callingCodes: ["255"],
	},
	TT: {
		name: "Trinidad and Tobago",
		callingCodes: ["1868"],
	},
	TN: {
		name: "Tunisia",
		callingCodes: ["216"],
	},
	TR: {
		name: "Turkey",
		callingCodes: ["90"],
	},
	TG: {
		name: "Togo",
		callingCodes: ["228"],
	},
	TM: {
		name: "Turkmenistan",
		callingCodes: ["993"],
	},
	TV: {
		name: "Tuvalu",
		callingCodes: ["688"],
	},
	TK: {
		name: "Tokelau",
		callingCodes: ["690"],
	},
	UG: {
		name: "Uganda",
		callingCodes: ["256"],
	},
	TO: {
		name: "Tonga",
		callingCodes: ["676"],
	},
	UA: {
		name: "Ukraine",
		callingCodes: ["380"],
	},
	UY: {
		name: "Uruguay",
		callingCodes: ["598"],
	},
	VU: {
		name: "Vanuatu",
		callingCodes: ["678"],
	},
	VE: {
		name: "Venezuela (Bolivarian Republic of)",
		callingCodes: ["58"],
	},
	VN: {
		name: "Viet Nam",
		callingCodes: ["84"],
	},
	UZ: {
		name: "Uzbekistan",
		callingCodes: ["998"],
	},
	WF: {
		name: "Wallis and Futuna",
		callingCodes: ["681"],
	},
	GB: {
		name: "United Kingdom of Great Britain and Northern Ireland",
		callingCodes: ["44"],
	},
	EH: {
		name: "Western Sahara",
		callingCodes: ["212"],
	},
	ZW: {
		name: "Zimbabwe",
		callingCodes: ["263"],
	},
	AF: {
		name: "Afghanistan",
		callingCodes: ["93"],
	},
	AS: {
		name: "American Samoa",
		callingCodes: ["1684"],
	},
	AM: {
		name: "Armenia",
		callingCodes: ["374"],
	},
	BJ: {
		name: "Benin",
		callingCodes: ["229"],
	},
	BA: {
		name: "Bosnia and Herzegovina",
		callingCodes: ["387"],
	},
	UM: {
		name: "United States Minor Outlying Islands",
		callingCodes: [""],
	},
	CF: {
		name: "Central African Republic",
		callingCodes: ["236"],
	},
	ZM: {
		name: "Zambia",
		callingCodes: ["260"],
	},
	CR: {
		name: "Costa Rica",
		callingCodes: ["506"],
	},
	EG: {
		name: "Egypt",
		callingCodes: ["20"],
	},
	FR: {
		name: "France",
		callingCodes: ["33"],
	},
	GD: {
		name: "Grenada",
		callingCodes: ["1473"],
	},
	GW: {
		name: "Guinea-Bissau",
		callingCodes: ["245"],
	},
	HK: {
		name: "Hong Kong",
		callingCodes: ["852"],
	},
	ID: {
		name: "Indonesia",
		callingCodes: ["62"],
	},
	JM: {
		name: "Jamaica",
		callingCodes: ["1876"],
	},
	JE: {
		name: "Jersey",
		callingCodes: ["44"],
	},
	LB: {
		name: "Lebanon",
		callingCodes: ["961"],
	},
	MH: {
		name: "Marshall Islands",
		callingCodes: ["692"],
	},
	MC: {
		name: "Monaco",
		callingCodes: ["377"],
	},
	MZ: {
		name: "Mozambique",
		callingCodes: ["258"],
	},
	NZ: {
		name: "New Zealand",
		callingCodes: ["64"],
	},
	PS: {
		name: "Palestine, State of",
		callingCodes: ["970"],
	},
	XK: {
		name: "Republic of Kosovo",
		callingCodes: ["383"],
	},
	RU: {
		name: "Russian Federation",
		callingCodes: ["7"],
	},
	MF: {
		name: "Saint Martin (French part)",
		callingCodes: ["590"],
	},
	PM: {
		name: "Saint Pierre and Miquelon",
		callingCodes: ["508"],
	},
	BO: {
		name: "Bolivia (Plurinational State of)",
		callingCodes: ["591"],
	},
	VG: {
		name: "Virgin Islands (British)",
		callingCodes: ["1284"],
	},
	SO: {
		name: "Somalia",
		callingCodes: ["252"],
	},
	SD: {
		name: "Sudan",
		callingCodes: ["249"],
	},
	TH: {
		name: "Thailand",
		callingCodes: ["66"],
	},
	TL: {
		name: "Timor-Leste",
		callingCodes: ["670"],
	},
	TC: {
		name: "Turks and Caicos Islands",
		callingCodes: ["1649"],
	},
	AE: {
		name: "United Arab Emirates",
		callingCodes: ["971"],
	},
	YE: {
		name: "Yemen",
		callingCodes: ["967"],
	},
	CD: {
		name: "Congo (Democratic Republic of the)",
		callingCodes: ["243"],
	},
	SV: {
		name: "El Salvador",
		callingCodes: ["503"],
	},
	PF: {
		name: "French Polynesia",
		callingCodes: ["689"],
	},
	MK: {
		name: "Macedonia (the former Yugoslav Republic of)",
		callingCodes: ["389"],
	},
	MY: {
		name: "Malaysia",
		callingCodes: ["60"],
	},
	KP: {
		name: "Korea (Democratic People's Republic of)",
		callingCodes: ["850"],
	},
	SX: {
		name: "Sint Maarten (Dutch part)",
		callingCodes: ["1721"],
	},
	US: {
		name: "United States of America",
		callingCodes: ["1"],
	},
};

export type IsoCodes = keyof typeof data;

export interface CountryData {
	name: string;
	callingCodes: string[];
}

export const countriesData: Record<IsoCodes, CountryData> = data;
