const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // יצירת כתובת
    const address = await prisma.address.create({
        data: {
            country: "Israel",
            city: "Tel Aviv",
            street: "Dizengoff",
            houseNumber: "123",
            zipCode: "64332",
        },
    });

    // יצירת משתמש
    const user = await prisma.users.create({
        data: {
            email: "user@example.com",
            name: "Alice",
            image: "https://example.com/user.jpg",
            address: { connect: { id: address.id } },
            password: {
                create: {
                    hash: "user_password_hash"
                }
            }
        }
    });

    // יצירת קטגוריה ותת-קטגוריה
    const categoryShoes = await prisma.category.create({
        data: { name: "Shoes" }
    });

    const subCategorySportsShoes = await prisma.subCategory.create({
        data: {
            name: "Sports Shoes",
            category: { connect: { id: categoryShoes.id } },
        }
    });

    // יצירת עובד
    const employee = await prisma.employees.create({
        data: {
            user: { connect: { id: user.id } },
            business: {
                create: {
                    name: "Tech Business",
                    logo: "logo.png",
                    phone: "123-456-7890",
                    email: "business@example.com",
                    address: "123 Tech St",
                    zipCode: "12345"
                }
            }
        }
    });

    // יצירת צבע ומידה
    const colorRed = await prisma.color.create({
        data: {
            name: "Red",
            hexCode: "#FF0000"
        }
    });

    const sizeM = await prisma.size.create({
        data: {
            label: "M"
        }
    });

    // יצירת מוצרים וקישור לקטגוריה, תת-קטגוריה ועובד
    const productsData = [
        {
            name: "Nike Air Max",
            description: "Comfortable sports shoes",
            price: 150.00,
            amount: 20,
            sales: 5,
            image: "https://example.com/nike-air-max.jpg",
        },
        {
            name: "Adidas Ultraboost",
            description: "Running shoes with advanced cushioning",
            price: 180.00,
            amount: 15,
            sales: 3,
            image: "https://example.com/adidas-ultraboost.jpg",
        },
    ];

    for (const productData of productsData) {
        const product = await prisma.product.create({
            data: {
                ...productData,
                category: { connect: { id: categoryShoes.id } },
                subCategory: { connect: { id: subCategorySportsShoes.id } },
                employee: { connect: { id: employee.id } },
                colors: {
                    create: {
                        color: { connect: { id: colorRed.id } }
                    }
                },
                sizes: {
                    create: {
                        size: { connect: { id: sizeM.id } }
                    }
                }
            },
        });
        console.log("מוצר נוצר:", product);
    }

    // יצירת סטטוס הזמנה ושיטת תשלום
    const status = await prisma.ordersStatus.create({ data: { name: "Pending" } });
    const paymentMethod = await prisma.paymentMethod.create({ data: { name: "Credit Card" } });

    // יצירת הזמנה
    const order = await prisma.orders.create({
        data: {
            orderDate: new Date(),
            totalAmount: 330.00,
            paymentMethod: { connect: { id: paymentMethod.id } },
            shippingAddress: { connect: { id: address.id } },
            expectedDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            user: { connect: { id: user.id } },
            status: { connect: { id: status.id } },
        },
    });

    // יצירת מוצרים להזמנה
    for (const productData of productsData) {
        const product = await prisma.product.findFirst({ where: { name: productData.name } });
        await prisma.orderProduct.create({
            data: {
                order: { connect: { id: order.id } },
                product: { connect: { id: product.id } },
                quantity: 2,
                price: productData.price,
            }
        });
    }

    // יצירת עגלה ופריטים בעגלה
    const cart = await prisma.cart.create({
        data: {
            user: { connect: { id: user.id } }
        }
    });

    for (const productData of productsData) {
        const product = await prisma.product.findFirst({ where: { name: productData.name } });
        await prisma.cartItem.create({
            data: {
                cart: { connect: { id: cart.id } },
                product: { connect: { id: product.id } },
                quantity: 1,
                size: "M",
                color: "Red",
                price: productData.price
            }
        });
    }

    console.log("נתוני Seed נוצרו בהצלחה!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });