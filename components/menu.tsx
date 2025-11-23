"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type MenuGroup = {
  name: string
  items: string[]
  time?: string
}

const groups: MenuGroup[] = [
  {
    name: "Breakfast",
    time: "8:30–11:30 am • Dinner 7:00–10:30 pm",
    items: [
      "Idly (Set, 2 nos)",
      "Sambar Idly",
      "Sambar Vadai",
      "Poori (Set)",
      "Pongal",
      "Vadai",
      "Kichadi",
      "Roast (Plain)",
      "Ghee Roast",
      "Masal Roast",
      "Mushroom Roast",
      "Onion Roast",
      "Egg Roast",
      "Podi Roast",
      "Uthappam",
      "Onion Uthappam",
      "Ghee Uthappam",
      "Egg Uthappam",
      "Tomato Uthappam",
      "Carrot Onion Uthappam",
      "Home Dosai",
      "Rava Roast",
      "Aappam (Set)",
      "Ediappam (3 Nos)",
      "Paniyaram (6 Nos)",
      "Coconut Milk",
      "Sevai",
      "Lemon Sevai",
      "Egg Sevai",
    ],
  },
  {
    name: "Lunch",
    items: [
      "Meals (Limit)",
      "Meals (Parcel)",
      "Parotta (Set)",
      "Veechu Parotta (Veg)",
      "Egg Parotta",
      "Kothu Parotta",
      "Chilli Parotta",
      "Chappathi (Set)",
      "Egg Chappathi",
      "Kushka",
      "Fried Rice (Veg)",
      "Fried Rice (Chicken)",
      "Fried Rice (Mushroom)",
      "Paneer Rice",
      "Fried Rice (Mixed Non-Veg)",
      "Noodles (Veg)",
      "Noodles (Egg)",
      "Noodles (Chicken)",
      "Noodles (Mushroom)",
      "Omlet",
      "Half Boil",
    ],
  },
  { name: "Veg Gravy", items: ["Paneer Butter Masala", "Mushroom Masala", "Gobi Masala"] },
  { name: "Mutton", items: ["Mutton Gravy", "Mutton Fry", "Mutton Biriyani"] },
  {
    name: "Chicken Dry",
    items: [
      "Egg Biriyani",
      "Chicken Biriyani (Egg)",
      "Chilli Chicken",
      "Chilli Boneless",
      "Hot Pepper Chicken (BL)",
      "Pepper Chicken Fry (BL)",
      "Chicken Manjurian (Dry BL)",
      "Chicken Fry (Bone)",
      "Lolly Pop (3 Pcs)",
      "Leg Piece",
      "Ginger Chicken (Dry BL)",
      "Garley Chicken (Dry BL)",
    ],
  },
  {
    name: "Chicken Gravy",
    items: [
      "Chicken Gravy (Bone)",
      "Chettinad Chicken Gravy",
      "Pepper Chicken Gravy (BL)",
      "Chicken Mujurian Gravy (BL)",
      "Butter Chicken Gravy (BL)",
      "Egg Gravy",
      "Palli Palayam Chicken Gravy (BL)",
      "Chicken Monica (BL)",
      "Chicken Hyderabad (BL)",
      "Ginger Chicken Gravy (BL)",
      "Garlic Chicken Gravy (BL)",
    ],
  },
  { name: "Fish", items: ["Fish Chilly", "Fish Manjurian", "Fish Pepper Fry"] },
  {
    name: "Veg Starters",
    items: [
      "Chilli Gopi",
      "Chilli Mushroom",
      "Gopi Manjurian",
      "Gopi Pepper Fry",
      "Mushroom Manjurian",
      "Mushroom Pepper Fry",
    ],
  },
  { name: "Drinks", items: ["Tea", "Coffee", "Horlicks", "Boost", "Lime Soda", "Badham Milk"] },
]

export function Menu() {
  const [tab, setTab] = useState(groups[0].name)
  const current = useMemo(() => groups.find((g) => g.name === tab)!, [tab])

  return (
    <section aria-labelledby="menu-title">
      <div className="mb-6">
        <h2 id="menu-title" className="text-2xl md:text-3xl font-semibold text-balance">
          Our Menu
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Explore delicious Veg & Non‑Veg options. Tap a category to view items.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <TabsTrigger
              key={g.name}
              value={g.name}
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              {g.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={current.name} className="mt-6">
          {current.time && <p className="text-sm text-amber-600 mb-3">{current.time}</p>}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {current.items.map((item) => (
                <motion.div key={item} whileHover={{ y: -3, scale: 1.01 }}>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">{item}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">Freshly prepared. Ask for spice levels.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </section>
  )
}
