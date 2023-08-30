import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies") 
 class Movie { 
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: false })
  duration: number;

  @Column({ type: "int", nullable: false })
  price: number;
}
export default Movie;
