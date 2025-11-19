import api from "@lib/axios";

// DTOs de tu backend:
export type GuideLanguage = {
  code: string;
  name: string;
};

export type GuideDetail = {
  id: string;
  nombres: string;
  apellidos: string;
  bio: string;
  city: string;
  country: string;
  certification: boolean;
  ratingAvg: number;
  languages: GuideLanguage[];
  createdAt?: string;
};

export type GuideSearchItem = {
  id: string;
  fullName: string;
  city?: string;
  ratingAvg?: number;
  certification?: boolean;
  languages?: string[];
  nextAvailable?: {
    startTime: string;
    endTime: string;
    status: string;
  };
  hourlyRate?: {
    currency: string;
    hourlyRate: number;
  };
};

// Función para crear un nuevo guía
export async function createGuide(body: {
  nombres: string;
  apellidos: string;
  dni: string;
  bio: string;
  city: string;
  country: string;
  certification: boolean;
  languages: GuideLanguage[];
  correo: string;
}) {
  const { data } = await api.post("/guides", body);
  return data;
}

// Función para obtener guías con filtros de búsqueda
export async function getGuides(params?: {
  city?: string;
  language?: string;
  date?: string;
  certification?: boolean;
}): Promise<GuideSearchItem[]> {
  const { data } = await api.get("/guides/search", {
    params: {
      city: params?.city,
      language: params?.language,
      date: params?.date,
      certification: params?.certification,
    },
  });
  return data;
}

// Función para obtener los detalles de un guía por su ID
export async function getGuideById(id: string): Promise<GuideDetail> {
  const { data } = await api.get(`/guides/${id}`);
  return data;
}
