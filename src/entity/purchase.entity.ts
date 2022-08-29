import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('purchases')
export class Purchase {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    purchase_date: Date;
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}