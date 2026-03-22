import { useState, useRef, useEffect, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";

const DRINKS = [
  { name: "VB (Victoria Bitter)", abv: 4.9, category: "Beer" },
  { name: "XXXX Gold", abv: 3.5, category: "Beer" },
  { name: "XXXX Bitter", abv: 4.4, category: "Beer" },
  { name: "XXXX Summer Bright", abv: 3.5, category: "Beer" },
  { name: "Carlton Draught", abv: 4.6, category: "Beer" },
  { name: "Carlton Dry", abv: 4.5, category: "Beer" },
  { name: "Carlton Zero", abv: 0.0, category: "Beer" },
  { name: "Tooheys New", abv: 4.6, category: "Beer" },
  { name: "Tooheys Extra Dry", abv: 4.4, category: "Beer" },
  { name: "Tooheys Old", abv: 4.4, category: "Beer" },
  { name: "Hahn SuperDry", abv: 4.6, category: "Beer" },
  { name: "Hahn Premium", abv: 5.0, category: "Beer" },
  { name: "Hahn Ultra", abv: 2.2, category: "Beer" },
  { name: "Great Northern Original", abv: 4.2, category: "Beer" },
  { name: "Great Northern Super Crisp", abv: 3.5, category: "Beer" },
  { name: "Coopers Pale Ale", abv: 4.5, category: "Beer" },
  { name: "Coopers Sparkling Ale", abv: 5.8, category: "Beer" },
  { name: "Coopers Best Extra Stout", abv: 6.3, category: "Beer" },
  { name: "Coopers Session Ale", abv: 4.2, category: "Beer" },
  { name: "Coopers Mild", abv: 3.5, category: "Beer" },
  { name: "James Boag's Premium", abv: 5.0, category: "Beer" },
  { name: "Cascade Premium Lager", abv: 5.2, category: "Beer" },
  { name: "Crown Lager", abv: 4.9, category: "Beer" },
  { name: "Foster's Lager", abv: 4.0, category: "Beer" },
  { name: "Iron Jack", abv: 3.5, category: "Beer" },
  { name: "Pure Blonde Ultra Low", abv: 1.2, category: "Beer" },
  { name: "Furphy Refreshing Ale", abv: 4.4, category: "Beer" },
  { name: "Stone & Wood Pacific Ale", abv: 4.4, category: "Beer" },
  { name: "Stone & Wood Green Coast", abv: 3.5, category: "Beer" },
  { name: "Balter XPA", abv: 5.0, category: "Beer" },
  { name: "Balter Captain Sensible", abv: 3.5, category: "Beer" },
  { name: "Young Henrys Newtowner", abv: 4.8, category: "Beer" },
  { name: "Pirate Life Pale Ale", abv: 5.4, category: "Beer" },
  { name: "Pirate Life IPA", abv: 6.8, category: "Beer" },
  { name: "Little Creatures Pale Ale", abv: 5.2, category: "Beer" },
  { name: "Little Creatures IPA", abv: 6.4, category: "Beer" },
  { name: "Fat Yak Pale Ale", abv: 4.7, category: "Beer" },
  { name: "4 Pines Pale Ale", abv: 5.1, category: "Beer" },
  { name: "Gage Roads Single Fin", abv: 4.5, category: "Beer" },
  { name: "Feral Hop Hog", abv: 5.8, category: "Beer" },
  { name: "Felons Brewing Crisp Lager", abv: 4.4, category: "Beer" },
  { name: "Aether Brewing Pale", abv: 4.8, category: "Beer" },
  { name: "Green Beacon Windjammer IPA", abv: 6.0, category: "Beer" },
  { name: "Heineken", abv: 5.0, category: "Beer" },
  { name: "Heineken 0.0", abv: 0.0, category: "Beer" },
  { name: "Corona Extra", abv: 4.5, category: "Beer" },
  { name: "Budweiser", abv: 5.0, category: "Beer" },
  { name: "Bud Light", abv: 4.2, category: "Beer" },
  { name: "Coors Light", abv: 4.2, category: "Beer" },
  { name: "Stella Artois", abv: 5.0, category: "Beer" },
  { name: "Peroni Nastro Azzurro", abv: 5.1, category: "Beer" },
  { name: "Asahi Super Dry", abv: 5.0, category: "Beer" },
  { name: "Kirin Ichiban", abv: 5.0, category: "Beer" },
  { name: "Sapporo Premium", abv: 4.9, category: "Beer" },
  { name: "Tiger Beer", abv: 5.0, category: "Beer" },
  { name: "Modelo Especial", abv: 4.4, category: "Beer" },
  { name: "Pilsner Urquell", abv: 4.4, category: "Beer" },
  { name: "Carlsberg", abv: 5.0, category: "Beer" },
  { name: "Kronenbourg 1664", abv: 5.0, category: "Beer" },
  { name: "Hoegaarden", abv: 4.9, category: "Beer" },
  { name: "Blue Moon Belgian White", abv: 5.4, category: "Beer" },
  { name: "Erdinger Weissbier", abv: 5.3, category: "Beer" },
  { name: "Paulaner Hefe-Weissbier", abv: 5.5, category: "Beer" },
  { name: "Delirium Tremens", abv: 8.5, category: "Beer" },
  { name: "Chimay Blue", abv: 9.0, category: "Beer" },
  { name: "Duvel", abv: 8.5, category: "Beer" },
  { name: "Leffe Blonde", abv: 6.6, category: "Beer" },
  { name: "Westmalle Tripel", abv: 9.5, category: "Beer" },
  { name: "Guinness Draught", abv: 4.2, category: "Beer" },
  { name: "Guinness Foreign Extra Stout", abv: 7.5, category: "Beer" },
  { name: "Newcastle Brown Ale", abv: 4.7, category: "Beer" },
  { name: "Sierra Nevada Pale Ale", abv: 5.6, category: "Beer" },
  { name: "Sierra Nevada Torpedo IPA", abv: 7.2, category: "Beer" },
  { name: "Lagunitas IPA", abv: 6.2, category: "Beer" },
  { name: "Stone IPA", abv: 6.9, category: "Beer" },
  { name: "BrewDog Punk IPA", abv: 5.4, category: "Beer" },
  { name: "BrewDog Hazy Jane", abv: 5.0, category: "Beer" },
  { name: "Somersby Apple Cider", abv: 4.5, category: "Cider" },
  { name: "Bulmers Original", abv: 4.5, category: "Cider" },
  { name: "Strongbow Original", abv: 5.0, category: "Cider" },
  { name: "Strongbow Dark Fruit", abv: 4.0, category: "Cider" },
  { name: "Magners Irish Cider", abv: 4.5, category: "Cider" },
  { name: "Mercury Hard Cider", abv: 6.9, category: "Cider" },
  { name: "Rekorderlig Strawberry-Lime", abv: 4.0, category: "Cider" },
  { name: "5 Seeds Crisp Apple", abv: 5.0, category: "Cider" },
  { name: "Willie Smith's Organic", abv: 5.4, category: "Cider" },
  { name: "Kopparberg Strawberry & Lime", abv: 4.0, category: "Cider" },
  { name: "White Claw Hard Seltzer", abv: 4.5, category: "Seltzer & RTD" },
  { name: "Fellr Brewed Seltzer", abv: 4.0, category: "Seltzer & RTD" },
  { name: "Truly Hard Seltzer", abv: 5.0, category: "Seltzer & RTD" },
  { name: "Vodka Cruiser (avg)", abv: 4.6, category: "Seltzer & RTD" },
  { name: "Smirnoff Ice", abv: 4.5, category: "Seltzer & RTD" },
  { name: "Canadian Club & Dry", abv: 4.8, category: "Seltzer & RTD" },
  { name: "Jim Beam & Cola", abv: 4.8, category: "Seltzer & RTD" },
  { name: "Jack Daniel's & Cola", abv: 4.8, category: "Seltzer & RTD" },
  { name: "Woodstock Bourbon & Cola", abv: 4.8, category: "Seltzer & RTD" },
  { name: "Wild Turkey & Cola RTD", abv: 4.8, category: "Seltzer & RTD" },
  { name: "Bundaberg Rum & Cola RTD", abv: 4.6, category: "Seltzer & RTD" },
  { name: "UDL Vodka & Lemonade", abv: 4.0, category: "Seltzer & RTD" },
  { name: "Red Wine — Shiraz", abv: 14.0, category: "Red Wine" },
  { name: "Red Wine — Cabernet Sauvignon", abv: 13.5, category: "Red Wine" },
  { name: "Red Wine — Merlot", abv: 13.5, category: "Red Wine" },
  { name: "Red Wine — Pinot Noir", abv: 13.0, category: "Red Wine" },
  { name: "Red Wine — Malbec", abv: 14.0, category: "Red Wine" },
  { name: "Red Wine — Tempranillo", abv: 13.5, category: "Red Wine" },
  { name: "Red Wine — Sangiovese", abv: 13.0, category: "Red Wine" },
  { name: "Red Wine — Grenache", abv: 14.5, category: "Red Wine" },
  { name: "Red Wine — Nebbiolo (Barolo)", abv: 14.0, category: "Red Wine" },
  { name: "Red Wine — Zinfandel", abv: 14.5, category: "Red Wine" },
  { name: "Red Wine — GSM Blend", abv: 14.0, category: "Red Wine" },
  { name: "Red Wine — Bordeaux Blend", abv: 13.5, category: "Red Wine" },
  { name: "Red Wine — Chianti", abv: 13.0, category: "Red Wine" },
  { name: "Red Wine — Rioja", abv: 13.5, category: "Red Wine" },
  { name: "Red Wine — Amarone", abv: 15.5, category: "Red Wine" },
  { name: "White Wine — Sauvignon Blanc", abv: 12.5, category: "White Wine" },
  { name: "White Wine — Chardonnay", abv: 13.5, category: "White Wine" },
  { name: "White Wine — Pinot Grigio", abv: 12.5, category: "White Wine" },
  { name: "White Wine — Riesling", abv: 11.0, category: "White Wine" },
  { name: "White Wine — Moscato", abv: 5.5, category: "White Wine" },
  { name: "White Wine — Viognier", abv: 14.0, category: "White Wine" },
  { name: "White Wine — Semillon", abv: 11.5, category: "White Wine" },
  { name: "White Wine — Verdelho", abv: 12.0, category: "White Wine" },
  { name: "White Wine — Chenin Blanc", abv: 12.5, category: "White Wine" },
  { name: "White Wine — Fiano", abv: 12.5, category: "White Wine" },
  { name: "Rosé — Provence Style", abv: 12.5, category: "Rosé" },
  { name: "Rosé — Grenache", abv: 13.0, category: "Rosé" },
  { name: "Rosé — Pinot Noir", abv: 12.0, category: "Rosé" },
  { name: "Rosé — White Zinfandel", abv: 10.0, category: "Rosé" },
  { name: "Champagne (avg)", abv: 12.0, category: "Sparkling" },
  { name: "Prosecco", abv: 11.0, category: "Sparkling" },
  { name: "Cava", abv: 11.5, category: "Sparkling" },
  { name: "Sparkling Shiraz", abv: 14.0, category: "Sparkling" },
  { name: "Sparkling Rosé", abv: 12.0, category: "Sparkling" },
  { name: "Moscato d'Asti", abv: 5.5, category: "Sparkling" },
  { name: "Port — Ruby", abv: 19.5, category: "Fortified" },
  { name: "Port — Tawny", abv: 20.0, category: "Fortified" },
  { name: "Sherry — Fino", abv: 15.0, category: "Fortified" },
  { name: "Sherry — Amontillado", abv: 17.0, category: "Fortified" },
  { name: "Vermouth — Sweet", abv: 16.0, category: "Fortified" },
  { name: "Vermouth — Dry", abv: 18.0, category: "Fortified" },
  { name: "Vodka (standard)", abv: 40.0, category: "Vodka" },
  { name: "Absolut", abv: 40.0, category: "Vodka" },
  { name: "Grey Goose", abv: 40.0, category: "Vodka" },
  { name: "Belvedere", abv: 40.0, category: "Vodka" },
  { name: "Smirnoff", abv: 37.5, category: "Vodka" },
  { name: "Ketel One", abv: 40.0, category: "Vodka" },
  { name: "Tito's Handmade", abv: 40.0, category: "Vodka" },
  { name: "Archie Rose Vodka", abv: 40.0, category: "Vodka" },
  { name: "Gin (standard)", abv: 40.0, category: "Gin" },
  { name: "Tanqueray", abv: 43.1, category: "Gin" },
  { name: "Tanqueray No. Ten", abv: 47.3, category: "Gin" },
  { name: "Bombay Sapphire", abv: 40.0, category: "Gin" },
  { name: "Hendrick's", abv: 41.4, category: "Gin" },
  { name: "Beefeater", abv: 40.0, category: "Gin" },
  { name: "Gordon's", abv: 37.2, category: "Gin" },
  { name: "Monkey 47", abv: 47.0, category: "Gin" },
  { name: "The Botanist", abv: 46.0, category: "Gin" },
  { name: "Roku Japanese Gin", abv: 43.0, category: "Gin" },
  { name: "Four Pillars Rare Dry", abv: 41.8, category: "Gin" },
  { name: "Four Pillars Bloody Shiraz", abv: 37.8, category: "Gin" },
  { name: "Archie Rose Signature Dry", abv: 42.0, category: "Gin" },
  { name: "Ink Gin", abv: 43.0, category: "Gin" },
  { name: "Malfy Gin", abv: 41.0, category: "Gin" },
  { name: "Aviation Gin", abv: 42.0, category: "Gin" },
  { name: "Plymouth Gin", abv: 41.2, category: "Gin" },
  { name: "Sipsmith London Dry", abv: 41.6, category: "Gin" },
  { name: "Navy Strength Gin (avg)", abv: 57.0, category: "Gin" },
  { name: "Whiskey (standard)", abv: 40.0, category: "Whiskey" },
  { name: "Jack Daniel's Old No.7", abv: 40.0, category: "Whiskey" },
  { name: "Jack Daniel's Single Barrel", abv: 45.0, category: "Whiskey" },
  { name: "Jim Beam White", abv: 40.0, category: "Whiskey" },
  { name: "Jim Beam Black", abv: 43.0, category: "Whiskey" },
  { name: "Maker's Mark", abv: 45.0, category: "Whiskey" },
  { name: "Wild Turkey 101", abv: 50.5, category: "Whiskey" },
  { name: "Wild Turkey Rare Breed", abv: 58.4, category: "Whiskey" },
  { name: "Woodford Reserve", abv: 43.2, category: "Whiskey" },
  { name: "Buffalo Trace", abv: 45.0, category: "Whiskey" },
  { name: "Bulleit Bourbon", abv: 45.0, category: "Whiskey" },
  { name: "Four Roses Single Barrel", abv: 50.0, category: "Whiskey" },
  { name: "Knob Creek", abv: 50.0, category: "Whiskey" },
  { name: "Laphroaig 10", abv: 40.0, category: "Whiskey" },
  { name: "Lagavulin 16", abv: 43.0, category: "Whiskey" },
  { name: "Ardbeg 10", abv: 46.0, category: "Whiskey" },
  { name: "Talisker 10", abv: 45.8, category: "Whiskey" },
  { name: "Highland Park 12", abv: 43.0, category: "Whiskey" },
  { name: "Glenfiddich 12", abv: 40.0, category: "Whiskey" },
  { name: "Glenlivet 12", abv: 40.0, category: "Whiskey" },
  { name: "Macallan 12 Double Cask", abv: 40.0, category: "Whiskey" },
  { name: "Monkey Shoulder", abv: 40.0, category: "Whiskey" },
  { name: "Johnnie Walker Red", abv: 40.0, category: "Whiskey" },
  { name: "Johnnie Walker Black", abv: 40.0, category: "Whiskey" },
  { name: "Johnnie Walker Blue", abv: 40.0, category: "Whiskey" },
  { name: "Chivas Regal 12", abv: 40.0, category: "Whiskey" },
  { name: "Jameson Irish Whiskey", abv: 40.0, category: "Whiskey" },
  { name: "Redbreast 12", abv: 40.0, category: "Whiskey" },
  { name: "Canadian Club", abv: 40.0, category: "Whiskey" },
  { name: "Nikka From The Barrel", abv: 51.4, category: "Whiskey" },
  { name: "Hibiki Harmony", abv: 43.0, category: "Whiskey" },
  { name: "Suntory Toki", abv: 43.0, category: "Whiskey" },
  { name: "Yamazaki 12", abv: 43.0, category: "Whiskey" },
  { name: "Starward Nova", abv: 41.0, category: "Whiskey" },
  { name: "Starward Two-Fold", abv: 40.0, category: "Whiskey" },
  { name: "Lark Classic Cask", abv: 43.0, category: "Whiskey" },
  { name: "Sullivan's Cove", abv: 47.5, category: "Whiskey" },
  { name: "Fireball Cinnamon Whisky", abv: 33.0, category: "Whiskey" },
  { name: "Rum (standard)", abv: 40.0, category: "Rum" },
  { name: "Bundaberg UP Rum", abv: 37.0, category: "Rum" },
  { name: "Bundaberg Red", abv: 37.0, category: "Rum" },
  { name: "Bundaberg Small Batch", abv: 40.0, category: "Rum" },
  { name: "Bacardi Carta Blanca", abv: 37.5, category: "Rum" },
  { name: "Captain Morgan Spiced", abv: 35.0, category: "Rum" },
  { name: "Havana Club 3 Años", abv: 40.0, category: "Rum" },
  { name: "Kraken Black Spiced", abv: 40.0, category: "Rum" },
  { name: "Sailor Jerry Spiced", abv: 40.0, category: "Rum" },
  { name: "Diplomatico Reserva Exclusiva", abv: 40.0, category: "Rum" },
  { name: "Malibu Coconut Rum", abv: 21.0, category: "Rum" },
  { name: "Overproof Rum (avg)", abv: 57.0, category: "Rum" },
  { name: "Tequila (standard)", abv: 40.0, category: "Tequila" },
  { name: "Jose Cuervo Especial Silver", abv: 38.0, category: "Tequila" },
  { name: "Patron Silver", abv: 40.0, category: "Tequila" },
  { name: "Don Julio Blanco", abv: 40.0, category: "Tequila" },
  { name: "Don Julio 1942", abv: 40.0, category: "Tequila" },
  { name: "Casamigos Blanco", abv: 40.0, category: "Tequila" },
  { name: "Espolòn Blanco", abv: 40.0, category: "Tequila" },
  { name: "El Jimador Blanco", abv: 38.0, category: "Tequila" },
  { name: "Mezcal (avg)", abv: 42.0, category: "Tequila" },
  { name: "Brandy (standard)", abv: 40.0, category: "Brandy" },
  { name: "Hennessy VS", abv: 40.0, category: "Brandy" },
  { name: "Hennessy VSOP", abv: 40.0, category: "Brandy" },
  { name: "Rémy Martin VSOP", abv: 40.0, category: "Brandy" },
  { name: "Courvoisier VS", abv: 40.0, category: "Brandy" },
  { name: "Pisco", abv: 42.0, category: "Brandy" },
  { name: "Grappa", abv: 42.0, category: "Brandy" },
  { name: "Kahlúa", abv: 20.0, category: "Liqueur" },
  { name: "Baileys Irish Cream", abv: 17.0, category: "Liqueur" },
  { name: "Cointreau", abv: 40.0, category: "Liqueur" },
  { name: "Grand Marnier", abv: 40.0, category: "Liqueur" },
  { name: "Amaretto (Disaronno)", abv: 28.0, category: "Liqueur" },
  { name: "Frangelico", abv: 20.0, category: "Liqueur" },
  { name: "Chartreuse Green", abv: 55.0, category: "Liqueur" },
  { name: "Sambuca", abv: 38.0, category: "Liqueur" },
  { name: "Limoncello", abv: 28.0, category: "Liqueur" },
  { name: "Aperol", abv: 11.0, category: "Liqueur" },
  { name: "Campari", abv: 25.0, category: "Liqueur" },
  { name: "St-Germain Elderflower", abv: 20.0, category: "Liqueur" },
  { name: "Midori", abv: 20.0, category: "Liqueur" },
  { name: "Blue Curaçao", abv: 25.0, category: "Liqueur" },
  { name: "Jägermeister", abv: 35.0, category: "Liqueur" },
  { name: "Fernet-Branca", abv: 39.0, category: "Liqueur" },
  { name: "Pimm's No. 1", abv: 25.0, category: "Liqueur" },
  { name: "Southern Comfort", abv: 35.0, category: "Liqueur" },
  { name: "Absinthe (avg)", abv: 60.0, category: "Liqueur" },
  { name: "Mr Black Coffee Liqueur", abv: 25.0, category: "Liqueur" },
  { name: "Sake — Junmai", abv: 15.0, category: "Other" },
  { name: "Soju (standard)", abv: 17.0, category: "Other" },
  { name: "Baijiu (avg)", abv: 52.0, category: "Other" },
  { name: "Mead (avg)", abv: 12.0, category: "Other" },
  { name: "Shochu", abv: 25.0, category: "Other" },
  { name: "Espresso Martini", abv: 14.0, category: "Cocktail" },
  { name: "Margarita", abv: 13.0, category: "Cocktail" },
  { name: "Tommy's Margarita", abv: 15.0, category: "Cocktail" },
  { name: "Mojito", abv: 10.0, category: "Cocktail" },
  { name: "Old Fashioned", abv: 32.0, category: "Cocktail" },
  { name: "Negroni", abv: 24.0, category: "Cocktail" },
  { name: "Manhattan", abv: 30.0, category: "Cocktail" },
  { name: "Martini (Dry)", abv: 30.0, category: "Cocktail" },
  { name: "Aperol Spritz", abv: 8.0, category: "Cocktail" },
  { name: "Long Island Iced Tea", abv: 22.0, category: "Cocktail" },
  { name: "Cosmopolitan", abv: 20.0, category: "Cocktail" },
  { name: "Whiskey Sour", abv: 15.0, category: "Cocktail" },
  { name: "Daiquiri", abv: 20.0, category: "Cocktail" },
  { name: "Piña Colada", abv: 12.0, category: "Cocktail" },
  { name: "Mai Tai", abv: 17.0, category: "Cocktail" },
  { name: "Moscow Mule", abv: 11.0, category: "Cocktail" },
  { name: "Dark & Stormy", abv: 11.0, category: "Cocktail" },
  { name: "Gin & Tonic", abv: 10.0, category: "Cocktail" },
  { name: "Vodka Soda", abv: 10.0, category: "Cocktail" },
  { name: "Rum & Coke", abv: 10.0, category: "Cocktail" },
  { name: "Whiskey & Coke", abv: 10.0, category: "Cocktail" },
  { name: "Paloma", abv: 10.0, category: "Cocktail" },
  { name: "Boulevardier", abv: 25.0, category: "Cocktail" },
  { name: "French 75", abv: 15.0, category: "Cocktail" },
  { name: "Amaretto Sour", abv: 13.0, category: "Cocktail" },
  { name: "Penicillin", abv: 20.0, category: "Cocktail" },
  { name: "Last Word", abv: 25.0, category: "Cocktail" },
  { name: "Paper Plane", abv: 22.0, category: "Cocktail" },
  { name: "Sazerac", abv: 30.0, category: "Cocktail" },
  { name: "Bramble", abv: 14.0, category: "Cocktail" },
  { name: "Sangria", abv: 8.0, category: "Cocktail" },
  { name: "Mimosa", abv: 8.0, category: "Cocktail" },
  { name: "Irish Coffee", abv: 10.0, category: "Cocktail" },
  { name: "Caipirinha", abv: 20.0, category: "Cocktail" },
  { name: "Zombie", abv: 25.0, category: "Cocktail" },
  { name: "Pornstar Martini", abv: 14.0, category: "Cocktail" },
];

const CATEGORIES = [...new Set(DRINKS.map((d) => d.category))];
const VOLUMES = [
  { label: "Shot — 30ml", ml: 30 }, { label: "Nip — 60ml", ml: 60 },
  { label: "Wine glass — 150ml", ml: 150 }, { label: "Cocktail — 180ml", ml: 180 },
  { label: "Small glass — 200ml", ml: 200 }, { label: "Middy — 285ml", ml: 285 },
  { label: "Stubby — 375ml", ml: 375 }, { label: "Schooner — 425ml", ml: 425 },
  { label: "Tall can — 500ml", ml: 500 }, { label: "Pint — 570ml", ml: 570 },
  { label: "Bottle — 750ml", ml: 750 }, { label: "Custom", ml: null },
];

const BAC_LEVELS = [
  { max: 0.02, label: "Sober", color: "#4ade80", desc: "Minimal effects" },
  { max: 0.05, label: "Relaxed", color: "#a3e635", desc: "Lowered inhibitions, mild euphoria" },
  { max: 0.08, label: "Buzzed", color: "#facc15", desc: "Impaired coordination & judgement" },
  { max: 0.10, label: "Legally Drunk", color: "#fb923c", desc: "Significant impairment. Over AU limit." },
  { max: 0.15, label: "Very Impaired", color: "#f87171", desc: "Major loss of balance & control" },
  { max: 0.30, label: "Severely Impaired", color: "#ef4444", desc: "Risk of blackout, medical concern" },
  { max: 99, label: "Dangerous", color: "#dc2626", desc: "Life-threatening. Seek help immediately." },
];

const ELIM = 0.015;

const getBacInfo = (bac) => BAC_LEVELS.find((l) => bac < l.max) || BAC_LEVELS[BAC_LEVELS.length - 1];
const nowTimeStr = () => { const d = new Date(); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const timeToMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const minToLabel = (m) => { const mm = ((m % 1440) + 1440) % 1440; const h = Math.floor(mm / 60); const mn = Math.round(mm % 60); const ap = h >= 12 ? "pm" : "am"; const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h; return `${h12}:${String(mn).padStart(2,"0")}${ap}`; };

function drinkBacAt(drink, atMin, weight, r) {
  const dm = timeToMin(drink.time);
  let elapsed = atMin - dm;
  if (elapsed < 0) elapsed += 1440;
  if (elapsed < 0 || elapsed > 1440) return 0;
  const grams = drink.volumeMl * (drink.abv / 100) * 0.789;
  const peak = (grams / (weight * 1000 * r)) * 100;
  return Math.max(0, peak - ELIM * (elapsed / 60));
}

function totalBacAt(drinks, atMin, weight, r) {
  return drinks.reduce((s, d) => s + drinkBacAt(d, atMin, weight, r), 0);
}

function buildGraphData(drinks, weight, r) {
  if (!drinks.length) return [];
  const mins = drinks.map((d) => timeToMin(d.time));
  const earliest = Math.min(...mins);
  let end = earliest;
  for (let t = earliest; t < earliest + 1440; t += 5) {
    if (totalBacAt(drinks, t % 1440, weight, r) > 0.001) end = t;
  }
  end = Math.min(end + 60, earliest + 1440);
  const data = [];
  for (let t = earliest; t <= end; t += 10) {
    const m = ((t % 1440) + 1440) % 1440;
    data.push({ min: t, time: minToLabel(m), bac: Math.round(totalBacAt(drinks, m, weight, r) * 10000) / 10000 });
  }
  return data;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const bac = payload[0].value;
  const info = getBacInfo(bac);
  return (
    <div style={{ background: "#19191c", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <div style={{ color: "#aaa", marginBottom: 4 }}>{label}</div>
      <div style={{ color: info.color, fontWeight: 600, fontSize: 16 }}>{bac.toFixed(4)}%</div>
      <div style={{ color: info.color + "bb", fontSize: 11, marginTop: 2 }}>{info.label}</div>
    </div>
  );
}

// ── Open Food Facts API ────────────────────────────────────────────────────
const OFF_CACHE_KEY = "bac-off-cache";
const OFF_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 h

function offGetCache(q) {
  try {
    const cache = JSON.parse(localStorage.getItem(OFF_CACHE_KEY) || "{}");
    const entry = cache[q];
    if (entry && Date.now() - entry.ts < OFF_CACHE_TTL) return entry.results;
  } catch {}
  return null;
}

function offSetCache(q, results) {
  try {
    const cache = JSON.parse(localStorage.getItem(OFF_CACHE_KEY) || "{}");
    cache[q] = { results, ts: Date.now() };
    const keys = Object.keys(cache);
    if (keys.length > 150) {
      const oldest = keys.sort((a, b) => cache[a].ts - cache[b].ts)[0];
      delete cache[oldest];
    }
    localStorage.setItem(OFF_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

function offMapCategory(tags) {
  if (!tags?.length) return "Other";
  const t = tags.join(" ").toLowerCase();
  if (/whisky|whiskey|bourbon|scotch/.test(t)) return "Whiskey";
  if (/\bgin\b/.test(t)) return "Gin";
  if (/vodka/.test(t)) return "Vodka";
  if (/\brum\b/.test(t)) return "Rum";
  if (/tequila|mezcal/.test(t)) return "Tequila";
  if (/brandy|cognac|armagnac|calvados/.test(t)) return "Brandy";
  if (/liqueur/.test(t)) return "Liqueur";
  if (/cider/.test(t)) return "Cider";
  if (/champagne|prosecco|cava|crémant/.test(t)) return "Sparkling";
  if (/sparkling.wine|wine.sparkling/.test(t)) return "Sparkling";
  if (/ros[eé]/.test(t)) return "Rosé";
  if (/red.wine|wine.red|vino.rosso|rotwein/.test(t)) return "Red Wine";
  if (/white.wine|wine.white|vino.bianco|weisswein/.test(t)) return "White Wine";
  if (/\bwine\b/.test(t)) return "Red Wine";
  if (/hard.seltzer|seltzer|rtd|ready.to.drink/.test(t)) return "Seltzer & RTD";
  if (/cocktail/.test(t)) return "Cocktail";
  if (/sake|soju|shochu|baijiu|mead/.test(t)) return "Other";
  if (/beer|ale|lager|stout|porter|ipa|pilsner|weizen|bier/.test(t)) return "Beer";
  return "Other";
}

function offMapProduct(p) {
  const name = p.product_name?.trim();
  if (!name || name.length < 2) return null;
  const n = p.nutriments || {};
  // OFF uses several field names depending on product/region
  const abv = n.alcohol ?? n.alcohol_value ?? n["alcohol_100g"] ?? n["alcohol_serving"] ?? null;
  if (abv == null || abv <= 0 || abv > 99) return null;
  return { name, abv: Math.round(abv * 10) / 10, category: offMapCategory(p.categories_tags) };
}

async function fetchOFF(query) {
  const key = query.toLowerCase().trim();
  const cached = offGetCache(key);
  if (cached) return cached;
  const url =
    `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(key)}` +
    `&categories_tags=alcoholic-beverages` +
    `&fields=product_name,nutriments,categories_tags&page_size=1000`;
  console.log("[BAC] Fetching OFF:", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OFF ${res.status}`);
  const data = await res.json();
  console.log("[BAC] Raw products:", (data.products || []).slice(0, 3).map(p => ({
    name: p.product_name,
    nutriments: p.nutriments,
  })));
  const seen = new Set();
  const results = (data.products || [])
    .map(offMapProduct)
    .filter(Boolean)
    .filter((d) => { const k = d.name.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  console.log("[BAC] Mapped results:", results.slice(0, 5));
  offSetCache(key, results);
  return results;
}
// ──────────────────────────────────────────────────────────────────────────

function DrinkSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [catFilter, setCatFilter] = useState("All");
  const [apiResults, setApiResults] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Live API search — fires 500 ms after the user stops typing, only for 3+ chars
  useEffect(() => {
    if (query.length < 3) { setApiResults([]); setApiError(false); return; }
    setApiLoading(true);
    setApiError(false);
    const timer = setTimeout(async () => {
      try {
        const results = await fetchOFF(query);
        // Filter out anything already in our curated list
        const local = new Set(DRINKS.map((d) => d.name.toLowerCase()));
        setApiResults(results.filter((d) => !local.has(d.name.toLowerCase())));
      } catch {
        setApiError(true);
        setApiResults([]);
      } finally {
        setApiLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = DRINKS.filter(
    (d) => (catFilter === "All" || d.category === catFilter) &&
           (!query || d.name.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredApi = catFilter === "All"
    ? apiResults
    : apiResults.filter((d) => d.category === catFilter);

  const handlePick = (d) => { onSelect(d); setQuery(""); setOpen(false); setCatFilter("All"); setApiResults([]); };

  const totalCount = DRINKS.length + (apiResults.length > 0 ? `+ live` : "");

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <label style={{ ...st.label, marginBottom: 0 }}>Search drinks</label>
        <span style={{ fontSize: 11, color: "#555", fontWeight: 400 }}>
          {DRINKS.length} curated{apiResults.length > 0 ? ` · ${apiResults.length} online` : ""}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Type to search…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{ ...st.searchInput, paddingRight: apiLoading ? 36 : 14 }}
        />
        {apiLoading && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#e8c46c", pointerEvents: "none" }}>⟳</span>
        )}
      </div>
      {open && (
        <div style={st.dropdown}>
          <div style={st.catRow}>
            {["All", ...CATEGORIES].map((c) => (
              <button key={c} onClick={() => setCatFilter(c)} style={{ ...st.catChip, ...(catFilter === c ? st.catChipActive : {}) }}>{c}</button>
            ))}
          </div>
          <div style={st.dropdownList}>
            {/* Curated results */}
            {filtered.length === 0 && filteredApi.length === 0 && !apiLoading && (
              <p style={st.noResults}>{query.length < 3 ? "Type at least 3 characters to search online" : "No matches found"}</p>
            )}
            {filtered.slice(0, 80).map((d, i) => (
              <button key={d.name + i} className="dd-item" onClick={() => handlePick(d)} style={st.dropdownItem}>
                <span style={st.dropdownName}>{d.name}</span>
                <span style={st.dropdownMeta}>{d.abv}% · {d.category}</span>
              </button>
            ))}
            {filtered.length > 80 && <p style={st.noResults}>Showing 80 of {filtered.length} — keep typing to narrow down</p>}

            {/* Online / API results */}
            {filteredApi.length > 0 && (
              <>
                <div style={st.apiDivider}>
                  <span>Open Food Facts database</span>
                </div>
                {filteredApi.slice(0, 40).map((d, i) => (
                  <button key={"api-" + i} className="dd-item" onClick={() => handlePick(d)} style={st.dropdownItem}>
                    <span style={st.dropdownName}>{d.name}</span>
                    <span style={st.dropdownMeta}>{d.abv}% · {d.category}</span>
                  </button>
                ))}
              </>
            )}
            {apiError && <p style={{ ...st.noResults, color: "#f87171" }}>Couldn't reach online database</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function BACEstimator() {
  const [drinks, setDrinks] = useLocalStorage("bac-drinks", []);
  const [currentTime, setCurrentTime] = useState(nowTimeStr);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [volumePreset, setVolumePreset] = useState("Schooner — 425ml");
  const [customVolume, setCustomVolume] = useState(425);
  const [editAbv, setEditAbv] = useState(5.0);
  const [drinkTime, setDrinkTime] = useState(nowTimeStr);
  const [drinkCost, setDrinkCost] = useState("");

  // Body profile — persisted
  const [weight, setWeight] = useLocalStorage("bac-weight", 82);
  const [sex, setSex] = useLocalStorage("bac-sex", "male");
  const [showProfile, setShowProfile] = useState(false);
  const r = sex === "male" ? 0.68 : 0.55;

  const handleSelect = (d) => {
    setSelectedDrink(d); setEditAbv(d.abv);
    if (d.category === "Cocktail") setVolumePreset("Cocktail — 180ml");
    else if (["Red Wine","White Wine","Rosé","Sparkling","Fortified"].includes(d.category)) setVolumePreset("Wine glass — 150ml");
    else if (["Vodka","Gin","Whiskey","Rum","Tequila","Brandy","Liqueur"].includes(d.category)) setVolumePreset("Shot — 30ml");
    else if (d.category === "Other") setVolumePreset("Small glass — 200ml");
    else setVolumePreset("Schooner — 425ml");
  };

  const getVol = () => { const p = VOLUMES.find((v) => v.label === volumePreset); return p?.ml ?? customVolume; };

  const addDrink = () => {
    if (!selectedDrink) return;
    const vol = getVol(); if (!vol || vol <= 0) return;
    setDrinks([...drinks, {
      name: selectedDrink.name, category: selectedDrink.category,
      volumeMl: vol, abv: editAbv, time: drinkTime,
      cost: drinkCost !== "" ? parseFloat(drinkCost) : null,
      id: Date.now(),
    }]);
    setSelectedDrink(null); setShowAdd(false); setDrinkTime(nowTimeStr()); setDrinkCost("");
  };

  const removeDrink = (id) => setDrinks(drinks.filter((d) => d.id !== id));
  const updateDrinkTime = (id, t) => setDrinks(drinks.map((d) => (d.id === id ? { ...d, time: t } : d)));

  const curMin = timeToMin(currentTime);
  const bac = totalBacAt(drinks, curMin, weight, r);
  const bacInfo = getBacInfo(bac);
  const soberIn = bac / ELIM;
  const stdDrinks = drinks.reduce((s, d) => s + (d.volumeMl * (d.abv / 100) * 0.789) / 10, 0);
  const totalCost = drinks.reduce((s, d) => s + (d.cost ?? 0), 0);
  const hasCost = drinks.some((d) => d.cost !== null);
  const graphData = useMemo(() => buildGraphData(drinks, weight, r), [drinks, weight, r]);

  return (
    <div style={st.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        input, select, button { font-family: 'DM Sans', sans-serif; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type="number"] { -moz-appearance: textfield; }
        select {
          -webkit-appearance: none; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .drink-row:hover { background: #1e1e22 !important; }
        .dd-item:hover { background: #222228 !important; }
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line { stroke: #222228 !important; }
        .recharts-text { fill: #666 !important; font-size: 11px !important; }
        .cat-row::-webkit-scrollbar { display: none; }
        @media (max-width: 480px) {
          input[type="text"], input[type="number"], select { font-size: 16px !important; }
        }
      `}</style>

      <div style={st.container}>
        {/* Header */}
        <div style={st.header}>
          <div style={st.headerAccent} />
          <h1 style={st.title}>BAC Estimator</h1>
          <button onClick={() => setShowProfile((v) => !v)} style={st.profileBtn}>
            <span style={{ marginRight: 5 }}>⚙</span>
            {weight} kg · {sex === "male" ? "Male" : "Female"}
            <span style={{ marginLeft: 5, color: "#e8c46c88" }}>{showProfile ? "▲" : "▼"}</span>
          </button>
          {showProfile && (
            <div style={st.profilePanel}>
              <div style={st.profileRow}>
                <label style={st.label}>Weight (kg)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="range" min={40} max={200} value={weight}
                    onChange={(e) => setWeight(+e.target.value)}
                    style={st.slider}
                  />
                  <span style={st.profileVal}>{weight}</span>
                </div>
              </div>
              <div style={st.profileRow}>
                <label style={st.label}>Biological sex</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setSex("male")} style={{ ...st.sexBtn, ...(sex === "male" ? st.sexBtnActive : {}) }}>Male</button>
                  <button onClick={() => setSex("female")} style={{ ...st.sexBtn, ...(sex === "female" ? st.sexBtnActive : {}) }}>Female</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Time */}
        <div style={{ ...st.section, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...st.sectionIcon, fontSize: 14 }}>◷</span>
            <span style={{ fontSize: 13, color: "#999", fontWeight: 500 }}>Current time</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="time" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} style={st.timeInput} />
            <button onClick={() => setCurrentTime(nowTimeStr())} style={st.nowBtn}>Now</button>
          </div>
        </div>

        {/* Graph */}
        {drinks.length > 0 && graphData.length > 1 && (
          <div style={st.section}>
            <h2 style={st.sectionTitle}><span style={st.sectionIcon}>◈</span> BAC Over Time</h2>
            <div style={{ margin: "0 -10px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bacGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e8c46c" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#e8c46c" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#555" }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10, fill: "#555" }} tickFormatter={(v) => v.toFixed(2)} domain={[0, "auto"]} />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine y={0.05} stroke="#f87171" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "0.05", position: "right", fill: "#f87171", fontSize: 10 }} />
                  {graphData.some((p) => p.time === minToLabel(curMin)) && (
                    <ReferenceLine x={minToLabel(curMin)} stroke="#e8c46c88" strokeDasharray="3 3" strokeWidth={1} label={{ value: "now", position: "top", fill: "#e8c46c", fontSize: 10 }} />
                  )}
                  <Area type="monotone" dataKey="bac" stroke="#e8c46c" strokeWidth={2} fill="url(#bacGrad)" dot={false} activeDot={{ r: 4, fill: "#e8c46c", stroke: "#111" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Result */}
        <div style={{ ...st.resultCard, borderColor: drinks.length > 0 ? bacInfo.color + "44" : "#2a2a2e" }}>
          <div style={st.bacLabelRow}>
            <span style={st.bacLabel}>Estimated BAC</span>
            {drinks.length > 0 && <span style={{ ...st.bacStatus, color: bacInfo.color }}>{bacInfo.label}</span>}
          </div>
          <div style={st.bacValueRow}>
            <span style={{ ...st.bacValue, color: drinks.length > 0 ? bacInfo.color : "#555" }}>{drinks.length > 0 ? bac.toFixed(4) : "—"}</span>
            <span style={st.bacUnit}>% BAC at {minToLabel(curMin)}</span>
          </div>
          {drinks.length > 0 && (<>
            <p style={{ ...st.bacDesc, color: bacInfo.color + "cc" }}>{bacInfo.desc}</p>
            <div style={st.metaRow}>
              <div style={st.metaItem}>
                <span style={st.metaLabel}>Sober in ≈</span>
                <span style={st.metaValue}>{soberIn < 1 ? `${Math.round(soberIn * 60)} min` : `${Math.floor(soberIn)}h ${Math.round((soberIn % 1) * 60)}m`}</span>
              </div>
              <div style={st.metaItem}>
                <span style={st.metaLabel}>AU drive limit</span>
                <span style={{ ...st.metaValue, color: bac >= 0.05 ? "#f87171" : "#4ade80" }}>{bac >= 0.05 ? "Over 0.05" : "Under 0.05"}</span>
              </div>
            </div>
            <div style={st.barTrack}>
              <div style={{ ...st.barFill, width: `${Math.min((bac / 0.30) * 100, 100)}%`, background: `linear-gradient(90deg, #4ade80, ${bacInfo.color})` }} />
              <div style={{ ...st.barMarker, left: `${(0.05 / 0.30) * 100}%` }}>
                <div style={st.barMarkerLine} />
                <span style={st.barMarkerLbl}>0.05</span>
              </div>
            </div>
          </>)}
        </div>

        {/* Drinks */}
        <div style={st.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: drinks.length > 0 || showAdd ? 12 : 0 }}>
            <h2 style={{ ...st.sectionTitle, marginBottom: 0 }}><span style={st.sectionIcon}>◎</span> Drinks</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {hasCost && <span style={{ ...st.stdDrinks, color: "#aaa", background: "#ffffff0a" }}>${totalCost.toFixed(2)}</span>}
              <span style={st.stdDrinks}>{stdDrinks.toFixed(1)} std</span>
              {drinks.length > 0 && (
                <button onClick={() => { if (window.confirm("Clear all drinks?")) setDrinks([]); }} style={st.clearBtn} title="Clear session">✕ Clear</button>
              )}
            </div>
          </div>
          {drinks.length === 0 && !showAdd && <p style={st.emptyState}>No drinks added yet. Tap below to start.</p>}
          {drinks.map((d) => (
            <div key={d.id} className="drink-row" style={st.drinkRow}>
              <div style={st.drinkInfo}>
                <span style={st.drinkName}>{d.name}</span>
                <span style={st.drinkMeta}>
                  {d.volumeMl}ml · {d.abv}% · {((d.volumeMl * (d.abv / 100) * 0.789) / 10).toFixed(1)} std
                  {d.cost !== null ? ` · $${d.cost.toFixed(2)}` : ""}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <input type="time" value={d.time} onChange={(e) => updateDrinkTime(d.id, e.target.value)} style={st.drinkTimeInput} />
                <button onClick={() => removeDrink(d.id)} style={st.removeBtn}>✕</button>
              </div>
            </div>
          ))}
          {showAdd && (
            <div style={st.addForm}>
              <DrinkSearch onSelect={handleSelect} />
              {selectedDrink && (<>
                <div style={st.selectedBadge}>
                  <span style={{ fontWeight: 600, color: "#e0e0e0" }}>{selectedDrink.name}</span>
                  <span style={{ color: "#888", fontSize: 12 }}>{selectedDrink.category}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ ...st.field, flex: 1 }}>
                    <label style={st.label}>Volume</label>
                    <select value={volumePreset} onChange={(e) => setVolumePreset(e.target.value)} style={st.select}>
                      {VOLUMES.map((v) => (<option key={v.label} value={v.label}>{v.label}</option>))}
                    </select>
                  </div>
                  <div style={{ ...st.field, width: 110 }}>
                    <label style={st.label}>Time</label>
                    <input type="time" value={drinkTime} onChange={(e) => setDrinkTime(e.target.value)} style={st.timeInput} />
                  </div>
                </div>
                {volumePreset === "Custom" && (
                  <div style={st.field}>
                    <label style={st.label}>Volume (ml)</label>
                    <input type="number" value={customVolume} onChange={(e) => setCustomVolume(+e.target.value)} style={st.input} min={1} max={5000} />
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ ...st.field, flex: 1 }}>
                    <label style={st.label}>ABV %</label>
                    <input type="number" value={editAbv} onChange={(e) => setEditAbv(+e.target.value)} style={st.input} min={0} max={100} step={0.1} />
                  </div>
                  <div style={{ ...st.field, flex: 1 }}>
                    <label style={st.label}>Cost $ (optional)</label>
                    <input type="number" value={drinkCost} onChange={(e) => setDrinkCost(e.target.value)} placeholder="0.00" style={st.input} min={0} step={0.5} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={addDrink} style={st.primaryBtn}>Add Drink</button>
                  <button onClick={() => { setShowAdd(false); setSelectedDrink(null); }} style={st.secondaryBtn}>Cancel</button>
                </div>
              </>)}
              {!selectedDrink && <button onClick={() => setShowAdd(false)} style={{ ...st.secondaryBtn, marginTop: 4 }}>Cancel</button>}
            </div>
          )}
          {!showAdd && <button onClick={() => { setShowAdd(true); setDrinkTime(nowTimeStr()); }} style={st.addBtn}>+ Add a Drink</button>}
        </div>

        <p style={st.disclaimer}>⚠ <strong>Estimate only</strong> — based on the Widmark formula. Actual BAC varies with metabolism, food intake, hydration, medications, and individual physiology. Never rely on this to determine fitness to drive.</p>
      </div>
    </div>
  );
}

const st = {
  root: { fontFamily: "'DM Sans', sans-serif", background: "#111113", minHeight: "100vh", color: "#e0e0e0", padding: "20px 12px" },
  container: { maxWidth: 520, margin: "0 auto" },
  header: { textAlign: "center", marginBottom: 20 },
  headerAccent: { width: 40, height: 3, background: "linear-gradient(90deg, #e8c46c, #d4a34a)", borderRadius: 2, margin: "0 auto 16px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, color: "#f5f0e8", letterSpacing: "-0.02em", marginBottom: 10 },
  profileBtn: { display: "inline-flex", alignItems: "center", gap: 2, fontSize: 13, color: "#888", background: "transparent", border: "1px solid #2a2a2e", borderRadius: 20, padding: "5px 14px", cursor: "pointer", marginBottom: 0 },
  profilePanel: { marginTop: 12, background: "#19191c", borderRadius: 12, padding: "16px 18px", border: "1px solid #222226", textAlign: "left", display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.2s ease" },
  profileRow: { display: "flex", flexDirection: "column", gap: 8 },
  profileVal: { fontSize: 14, fontWeight: 600, color: "#e0e0e0", minWidth: 28, textAlign: "right" },
  slider: { flex: 1, accentColor: "#e8c46c", height: 4 },
  sexBtn: { flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid #2a2a2e", background: "transparent", color: "#666", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  sexBtnActive: { background: "#e8c46c22", borderColor: "#e8c46c55", color: "#e8c46c" },
  section: { background: "#19191c", borderRadius: 14, padding: "20px 18px", marginBottom: 12, border: "1px solid #222226" },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 },
  sectionIcon: { color: "#e8c46c", fontSize: 12 },
  field: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 4 },
  label: { fontSize: 13, color: "#999", fontWeight: 500 },
  input: { padding: "10px 14px", borderRadius: 10, border: "1px solid #2a2a2e", background: "#111113", color: "#e0e0e0", fontSize: 14, outline: "none", width: "100%" },
  select: { padding: "10px 14px", borderRadius: 10, border: "1px solid #2a2a2e", background: "#111113", color: "#e0e0e0", fontSize: 14, outline: "none", width: "100%", cursor: "pointer", paddingRight: 36 },
  timeInput: { padding: "8px 10px", borderRadius: 8, border: "1px solid #2a2a2e", background: "#111113", color: "#e0e0e0", fontSize: 13, outline: "none", fontFamily: "'DM Sans', sans-serif", colorScheme: "dark", minWidth: 0 },
  nowBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #e8c46c44", background: "#e8c46c11", color: "#e8c46c", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
  emptyState: { color: "#555", fontSize: 14, textAlign: "center", padding: "16px 0 8px", fontStyle: "italic" },
  drinkRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "10px 12px", background: "#111113", borderRadius: 10, marginBottom: 8, border: "1px solid #222226", transition: "background 0.15s", animation: "fadeIn 0.3s ease" },
  drinkInfo: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0, flex: 1 },
  drinkName: { fontSize: 13, fontWeight: 500, color: "#e0e0e0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  drinkMeta: { fontSize: 11, color: "#666" },
  drinkTimeInput: { padding: "5px 6px", borderRadius: 6, border: "1px solid #2a2a2e", background: "#19191c", color: "#e8c46c", fontSize: 12, outline: "none", fontFamily: "'DM Sans', sans-serif", width: 80, colorScheme: "dark", minWidth: 0 },
  removeBtn: { width: 32, height: 32, borderRadius: 8, border: "none", background: "#2a1a1a", color: "#f87171", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  addForm: { display: "flex", flexDirection: "column", gap: 14, padding: "16px 14px", background: "#111113", borderRadius: 12, border: "1px solid #e8c46c33", animation: "fadeIn 0.25s ease" },
  addBtn: { width: "100%", padding: "12px 0", borderRadius: 10, border: "1px dashed #333", background: "transparent", color: "#e8c46c", fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 4 },
  primaryBtn: { flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #e8c46c, #d4a34a)", color: "#111", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  secondaryBtn: { flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #333", background: "transparent", color: "#888", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  stdDrinks: { fontSize: 12, color: "#e8c46c", fontWeight: 500, background: "#e8c46c14", padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" },
  resultCard: { background: "#19191c", borderRadius: 14, padding: "24px 20px", marginBottom: 12, border: "1px solid #222226", transition: "border-color 0.4s" },
  bacLabelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  bacLabel: { fontSize: 13, color: "#777", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" },
  bacStatus: { fontSize: 13, fontWeight: 600 },
  bacValueRow: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6, flexWrap: "wrap" },
  bacValue: { fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 12vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 },
  bacUnit: { fontSize: 13, color: "#555", fontWeight: 500 },
  bacDesc: { fontSize: 13, marginBottom: 18, lineHeight: 1.4 },
  metaRow: { display: "flex", gap: 12, marginBottom: 18 },
  metaItem: { flex: 1, background: "#111113", borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
  metaLabel: { fontSize: 11, color: "#666", fontWeight: 500 },
  metaValue: { fontSize: 14, fontWeight: 600, color: "#e0e0e0" },
  barTrack: { height: 8, background: "#222226", borderRadius: 4, position: "relative", overflow: "visible", marginTop: 4 },
  barFill: { height: "100%", borderRadius: 4, transition: "width 0.5s ease, background 0.5s ease" },
  barMarker: { position: "absolute", top: -4, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" },
  barMarkerLine: { width: 2, height: 16, background: "#e8c46c88", borderRadius: 1 },
  barMarkerLbl: { fontSize: 10, color: "#e8c46c", marginTop: 2, fontWeight: 600 },
  clearBtn: { fontSize: 11, color: "#f87171", background: "#f8717111", border: "1px solid #f8717133", borderRadius: 20, padding: "4px 10px", cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap" },
  disclaimer: { fontSize: 12, color: "#555", lineHeight: 1.6, textAlign: "center", padding: "4px 8px 20px" },
  searchInput: { padding: "10px 14px", borderRadius: 10, border: "1px solid #e8c46c44", background: "#19191c", color: "#e0e0e0", fontSize: 14, outline: "none", width: "100%" },
  dropdown: { position: "absolute", top: "100%", left: 0, right: 0, background: "#19191c", border: "1px solid #2a2a2e", borderRadius: 12, marginTop: 4, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.5)", overflow: "hidden" },
  catRow: { display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: 4, padding: "10px 10px 8px", borderBottom: "1px solid #222226", scrollbarWidth: "none", msOverflowStyle: "none" },
  catChip: { padding: "5px 12px", borderRadius: 20, border: "1px solid #2a2a2e", background: "transparent", color: "#888", fontSize: 11, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 },
  catChipActive: { background: "#e8c46c22", borderColor: "#e8c46c55", color: "#e8c46c" },
  dropdownList: { maxHeight: 260, overflowY: "auto" },
  dropdownItem: { width: "100%", padding: "11px 14px", border: "none", borderBottom: "1px solid #1a1a1e", background: "transparent", color: "#e0e0e0", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, transition: "background 0.1s" },
  dropdownName: { fontSize: 13, fontWeight: 500, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  dropdownMeta: { fontSize: 11, color: "#666", whiteSpace: "nowrap", flexShrink: 0 },
  noResults: { padding: "12px 14px", color: "#555", fontSize: 13 },
  apiDivider: { padding: "8px 14px", fontSize: 11, color: "#e8c46c99", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", background: "#e8c46c08", borderTop: "1px solid #e8c46c22", borderBottom: "1px solid #222226", display: "flex", alignItems: "center", gap: 8 },
  selectedBadge: { display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", background: "#19191c", borderRadius: 10, border: "1px solid #e8c46c33" },
};
