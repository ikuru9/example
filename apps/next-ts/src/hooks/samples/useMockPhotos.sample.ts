import HttpService from "@/lib/utils/http/http-service";
import type { Comment } from "@/models/samples/comment.sample";
import type { Photo } from "@/models/samples/photo.sample";
import { useQuery } from "@tanstack/react-query";

const http = new HttpService("https://example.com/sample-api/v1");

const prefix = ["photos"] as const;

export const queryOption = {
  photos: () => ({
    queryKey: prefix,
    queryFn: () => http.get<Photo[]>("/photos"),
  }),
  photo: ({ photoId }: { photoId: number }) => ({
    queryKey: [...prefix, photoId] as const,
    queryFn: () => http.get<Photo>(`/photos/${photoId}`),
  }),
  photoComments: ({ photoId }: { photoId: number }) => ({
    queryKey: [...prefix, photoId, "comment"] as const,
    queryFn: () => http.get<Comment[]>(`/photos/${photoId}/comments`),
  }),
  photoComment: ({ photoId, commentId }: { photoId: number; commentId: number }) => ({
    queryKey: [...prefix, photoId, "comment", commentId] as const,
    queryFn: () => http.get<Comment[]>(`/photos/${photoId}/comments/${commentId}`),
  }),
};

export function usePhotos() {
  return useQuery(queryOption.photos());
}

export function usePhoto({ photoId }: { photoId: number }) {
  return useQuery(queryOption.photo({ photoId }));
}

export function useComments({ photoId }: { photoId: number }) {
  return useQuery(queryOption.photoComments({ photoId }));
}

export function useComment({ photoId, commentId }: { photoId: number; commentId: number }) {
  return useQuery(queryOption.photoComment({ photoId, commentId }));
}
