export interface ITodoProps {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
}

export interface ICategoryProps {
  id: string;
  title: string;
  userId: string;
  todo?: ITodoProps[];
}
