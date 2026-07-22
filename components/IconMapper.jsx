import {
  Users,
  Clock3,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Globe,
  Building2,
  FileText,
  Upload,
  CreditCard,
  BadgeCheck
} from 'lucide-react'

const icons = {
  users: Users,
  clock: Clock3,
  shield: ShieldCheck,
  award: Award,
  book: BookOpen,
  graduation: GraduationCap,
  globe: Globe,
  building: Building2,
  filetext: FileText,
  upload: Upload,
  creditcard: CreditCard,
  badgecheck: BadgeCheck
}

export default function IconMapper({ name, ...props }) {
  const Icon = icons[name] || Award

  return <Icon strokeWidth={1.8} {...props} />
}
