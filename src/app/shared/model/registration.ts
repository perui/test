export class Registration {
  id: number;
  name: string;
  description: string;
  created: string;
  updated: string;
  category: string;
  industries: string;
  professions: string;
  competences: string;
  published: boolean;
  banned: boolean;
  homepage: string;
  logoUrl: string;
  organisation: {
    identifier: string;
    name: string;
  };
}
