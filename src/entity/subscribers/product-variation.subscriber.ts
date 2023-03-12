import { Product, ProductVariation, Inventory } from "src/entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class ProductVariationJoinProduct implements EntitySubscriberInterface<ProductVariation> {
    listenTo() {
        return ProductVariation;
    }

    // Find parent product ID to link to product variation before insert
    async beforeInsert(event: InsertEvent<ProductVariation>): Promise<any> {
        var inventory = await event.manager.save(Inventory, { SKU: event.entity.SKU });
        var product = await event.manager.findOne(Product, { where: { SKU: event.entity.parentSKU} });
        if (product) {
            event.entity.inventory = inventory;
            event.entity.parent = product;            
        }
    }
}