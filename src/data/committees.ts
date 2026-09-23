export interface Committee {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const committees: Committee[] = [
  {
    id: "unga",
    title: "UNGA",
    subtitle: "United Nations General Assembly",
    description: "Agenda: Hiroshima Process 2.0",
    image: "/comms/unga.jpg",
  },
  {
    id: "unhrc",
    title: "UNHRC",
    subtitle: "United Nations Human Rights Council",
    description: "Agenda: Universal Periodic Review of the Democratic Republic of the Congo and the People’s Republic of China",
    image: "/comms/unhrc.jpeg",
  },
  {
    id: "unsc",
    title: "UNSC",
    subtitle: "United Nations Security Council",
    description: "Agenda: The Situation in Azania, Keeping in Mind the Upcoming Elections",
    image: "/comms/unsc.jpeg",
  },
  {
    id: "ecosoc",
    title: "ECOSOC",
    subtitle: "Economic and Social Council",
    description: "Agenda: Combating transnational organized crime and its links to illicit trafficking in precious metals and illegal mining",
    image: "/comms/ecosoc.jpeg",
  },
  {
    id: "aippm",
    title: "AIPPM",
    subtitle: "All India Political Parties Meet",
    description: "Agenda: Discussion on the North-South Political Divide over  Delimitation and its Implications for Federal Trust, Regional Power-Sharing, and India's Political Unity",
    image: "/comms/aippm.jpeg",
  },
  {
    id: "tnsm",
    title: "TNSM",
    subtitle: "Tamil Nadu Stakeholders' Meet",
    description: "Agenda: TBD",
    image: "/comms/tnsm.jpg",
  },
  {
    id: "oau",
    title: "OAU",
    subtitle: "Organisation of African Unity",
    description: "Agenda: Situation in Angola. Freeze date: 9 January 1976",
    image: "/comms/oau.jpeg",
  },
  {
    id: "ipj",
    title: "IPJ",
    subtitle: "International Press Journalism",
    description: "Agenda: Journalism",
    image: "/comms/ipj.jpeg",
  },
  {
    id: "ipp",
    title: "IPP",
    subtitle: "International Press Photojournalism",
    description: "Agenda: Photojournalism",
    image: "/comms/ipp.jpeg",
  },
];
