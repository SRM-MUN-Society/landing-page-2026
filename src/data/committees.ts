export interface Committee {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag?: string;
}

export const committees: Committee[] = [
  {
    id: "unhrc",
    title: "HUMAN RIGHTS",
    subtitle: "COUNCIL",
    description: "Champion human rights protection and address violations globally.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80",
    tag: "#UNHRC",
  },
  {
    id: "who",
    title: "WORLD HEALTH",
    subtitle: "ORGANIZATION",
    description: "Develop global health policies and coordinate emergency responses.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=1000&fit=crop&q=80",
    tag: "#WHO",
  },
  {
    id: "unep",
    title: "ENVIRONMENT",
    subtitle: "PROGRAMME",
    description: "Address environmental challenges and promote sustainable development.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop&q=80",
    tag: "#UNEP",
  },
  {
    id: "unsc",
    title: "SECURITY",
    subtitle: "COUNCIL",
    description: "Maintain international peace and security through collective action.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop&q=80",
    tag: "#UNSC",
  },
  {
    id: "unga",
    title: "GENERAL",
    subtitle: "ASSEMBLY",
    description: "Deliberate on pressing international issues and global cooperation.",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=1000&fit=crop&q=80",
    tag: "#UNGA",
  },
];
