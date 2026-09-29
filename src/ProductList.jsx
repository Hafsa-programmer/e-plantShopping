import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const calculateTotalQuantity = () => {
        return Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.pexels.com/photos/33217706/pexels-photo-33217706/free-photo-of-vibrant-snake-plants-against-a-terracotta-wall.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://loremflickr.com/400/300/spiderplant,houseplant", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://loremflickr.com/400/300/peacelily,plant", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://loremflickr.com/400/300/bostonfern,plant", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { name: "Rubber Plant", image: "https://loremflickr.com/400/300/rubberplant,houseplant", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { name: "Aloe Vera", image: "https://loremflickr.com/400/300/aloevera,plant", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://loremflickr.com/400/300/lavender,flower", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { name: "Jasmine", image: "https://loremflickr.com/400/300/jasmine,flower", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { name: "Rosemary", image: "https://loremflickr.com/400/300/rosemary,herb", description: "Invigorating scent, often used in cooking.", cost: "$15" },
                { name: "Mint", image: "https://loremflickr.com/400/300/mint,herb", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
                { name: "Lemon Balm", image: "https://loremflickr.com/400/300/lemonbalm,herb", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
                { name: "Hyacinth", image: "https://loremflickr.com/400/300/hyacinth,flower", description: "Hyacinth is a beautiful flowering plant known for its fragrant.", cost: "$22" }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { name: "oregano", image: "https://loremflickr.com/400/300/oregano,herb", description: "The oregano plants contains compounds that can deter certain insects.", cost: "$10" },
                { name: "Marigold", image: "https://loremflickr.com/400/300/marigold,flower", description: "Natural insect repellent, also adds color to the garden.", cost: "$8" },
                { name: "Geraniums", image: "https://loremflickr.com/400/300/geranium,flower", description: "Known for their insect-repelling properties while adding a pleasant scent.", cost: "$20" },
                { name: "Basil", image: "https://loremflickr.com/400/300/basil,herb", description: "Repels flies and mosquitoes, also used in cooking.", cost: "$9" },
                { name: "Lavender", image: "https://loremflickr.com/400/300/lavender,flower", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { name: "Catnip", image: "https://loremflickr.com/400/300/catnip,herb", description: "Repels mosquitoes and attracts cats.", cost: "$13" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://loremflickr.com/400/300/aloevera,plant", description: "Soothing gel used for skin ailments.", cost: "$14" },
                { name: "Echinacea", image: "https://loremflickr.com/400/300/echinacea,flower", description: "Boosts immune system, helps fight colds.", cost: "$16" },
                { name: "Peppermint", image: "https://loremflickr.com/400/300/peppermint,herb", description: "Relieves digestive issues and headaches.", cost: "$13" },
                { name: "Lemon Balm", image: "https://loremflickr.com/400/300/lemonbalm,herb", description: "Calms nerves and promotes relaxation.", cost: "$14" },
                { name: "Chamomile", image: "https://loremflickr.com/400/300/chamomile,flower", description: "Soothes anxiety and promotes sleep.", cost: "$15" },
                { name: "Calendula", image: "https://loremflickr.com/400/300/calendula,flower", description: "Healing properties for minor cuts and skin irritations.", cost: "$12" }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { name: "ZZ Plant", image: "https://loremflickr.com/400/300/zzplant,houseplant", description: "Thrives in low light and requires minimal watering.", cost: "$25" },
                { name: "Pothos", image: "https://loremflickr.com/400/300/pothos,houseplant", description: "Tolerates neglect and can grow in various conditions.", cost: "$10" },
                { name: "Snake Plant", image: "https://loremflickr.com/400/300/snakeplant,houseplant", description: "Needs infrequent watering and is resilient to most pests.", cost: "$15" },
                { name: "Cast Iron Plant", image: "https://loremflickr.com/400/300/castironplant,houseplant", description: "Hardy plant that tolerates low light and neglect.", cost: "$20" },
                { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant plants with unique shapes and colors.", cost: "$18" },
                { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Requires minimal care and adds color to indoor spaces.", cost: "$22" }
            ]
        }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)

        setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
            ...prevState, // Spread the previous state to retain existing entries
            [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
        }));
    };

    return (
        <div className="product-grid">
            {showCart ? (
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : (
                <div>
                    <div className="navbar" style={styleObj}>
                        <div className="tag" style={{ cursor: 'pointer' }} onClick={onHomeClick}>
                            <div className="luxury">
                                <img src="https://pixabay.com" alt="logo" style={{ width: '50px', height: '50px' }} />
                                <div>
                                    <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                                    <i style={{ color: 'white', fontSize: '14px' }}>Where Greenery Meets Serenity</i>
                                </div>
                            </div>
                        </div>
                        <div style={styleObjUl}>
                            <div>
                                <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                            </div>
                            <div>
                                <a href="#" onClick={handleCartClick} style={styleA}>
                                    <h1 className="cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px', marginRight: '5px' }}>
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                                    </h1>
                                </a>
                            </div>
                        </div>
                    </div>

                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h1 className="category-title" style={{ textAlign: 'center', margin: '30px 0' }}>{category.category}</h1>
                            <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px', padding: '0 20px' }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', width: '280px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
                                        <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div className="product-title" style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0 5px' }}>{plant.name}</div>
                                        <div className="product-description" style={{ fontSize: '14px', color: '#666', height: '40px', overflow: 'hidden', marginBottom: '10px' }}>{plant.description}</div>
                                        <div className="product-cost" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                            style={{
                                                backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px',
                                                width: '100%',
                                                borderRadius: '4px',
                                                cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;