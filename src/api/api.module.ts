import { Module } from "@nestjs/common";
import { InventoryApiModule } from "./inventory/inventory.api.module";

@Module({
    imports: [InventoryApiModule],
})
export class ApiModule {}
