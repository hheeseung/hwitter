import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase";
import styled from "styled-components";

type Photo = {
  id: string;
  photo: string;
};

const PhotoGrid = styled.main`
  width: 50%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Photo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  &:hover {
    transform: scale(1.1);
    transition: all linear 0.2s;
  }
  cursor: pointer;
`;

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const unsubscribe = getPhotos(setPhotos);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <PhotoGrid>
      {photos.map(
        (photo) =>
          photo.photo !== undefined && (
            <Photo key={photo.id} src={photo.photo} alt="photo" />
          )
      )}
    </PhotoGrid>
  );
}
