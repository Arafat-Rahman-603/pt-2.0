import {
  BookOpen, Code, Facebook, FolderOpen, Gauge, GitBranch, Github, House,
  Linkedin, Mail, MapPin, Palette, Phone, Server, Shield, Target, User,
  Wrench, Zap, Sparkles,
} from "lucide-react";

/**
 * Maps the string icon names used in portfolio.json to lucide components.
 * Add a new entry here when you introduce a new icon name in the JSON.
 */
const ICONS = {
  "book-open": BookOpen,
  code: Code,
  facebook: Facebook,
  "folder-open": FolderOpen,
  gauge: Gauge,
  "git-branch": GitBranch,
  github: Github,
  home: House,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
  palette: Palette,
  phone: Phone,
  server: Server,
  shield: Shield,
  target: Target,
  user: User,
  wrench: Wrench,
  zap: Zap,
};

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp aria-hidden="true" {...props} />;
}
