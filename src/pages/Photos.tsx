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
  place-items: center;
  gap: 10px;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    background-color: inherit;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 80px;
    box-shadow: none;
  }
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  &:hover {
    transform: scale(1.1);
    transition: all linear 0.2s;
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
    &:hover {
      transform: none;
      transition: none;
    }
  }
`;

const NoPhotos = styled.p``;

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const allPhotosAreUndefined = photos.every(
    (photo) => photo.photo === undefined
  );

  useEffect(() => {
    const unsubscribe = getPhotos(setPhotos);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <PhotoGrid>
      {allPhotosAreUndefined ? (
        <NoPhotos>아직 등록된 사진이 없습니다.</NoPhotos>
      ) : (
        photos.map(
          (photo) =>
            photo.photo !== undefined && (
              <Photo key={photo.id} src={photo.photo} alt="photo" />
            )
        )
      )}
    </PhotoGrid>
  );
}
