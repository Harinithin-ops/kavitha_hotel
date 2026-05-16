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
      "Podi Roast",
      "Uthappam",
      "Onion Uthappam",
      "Ghee Uthappam",
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
    ],
  },
  {
    name: "Lunch",
    items: [
      "Meals (Limit)",
      "Meals (Parcel)",
      "Parotta (Set)",
      "Veechu Parotta",
      "Kothu Parotta",
      "Chilli Parotta",
      "Chappathi (Set)",
      "Fried Rice (Veg)",
      "Fried Rice (Mushroom)",
      "Paneer Rice",
      "Noodles (Veg)",
      "Noodles (Mushroom)",
      "Veg Pulao",
      "Jeera Rice",
    ],
  },
  { 
    name: "Gravies & Curries", 
    items: [
      "Paneer Butter Masala", 
      "Mushroom Masala", 
      "Gobi Masala",
      "Dal Fry",
      "Dal Makhani",
      "Kadai Paneer",
      "Palak Paneer",
      "Mixed Veg Curry"
    ] 
  },
  {
    name: "Starters & Snacks",
    items: [
      "Chilli Gopi",
      "Chilli Mushroom",
      "Gopi Manjurian",
      "Gopi Pepper Fry",
      "Mushroom Manjurian",
      "Mushroom Pepper Fry",
      "Paneer Tikka",
      "Veg Cutlet",
      "Onion Pakoda"
    ],
  },
  { name: "Drinks", items: ["Tea", "Coffee", "Horlicks", "Boost", "Lime Soda", "Badham Milk", "Fresh Juice"] },
]

export function Menu() {
  const [tab, setTab] = useState(groups[0].name)
  const current = useMemo(() => groups.find((g) => g.name === tab)!, [tab])

  return (
    <section aria-labelledby="menu-title">
      <div className="mb-8 text-center md:text-left">
        <h2 id="menu-title" className="text-3xl md:text-5xl font-semibold text-balance mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Our Culinary Experience
        </h2>
        <p className="text-base text-muted-foreground mt-2 max-w-2xl">
          Explore our exquisite selection of Pure Veg delicacies, crafted with passion by our master chefs.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex flex-wrap gap-2 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl">
          {groups.map((g) => (
            <TabsTrigger
              key={g.name}
              value={g.name}
              className="rounded-lg px-4 py-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all duration-300"
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
                <motion.div key={item} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-lg font-medium text-amber-50">{item}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10">
                      <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Prepared to perfection. Ask for spice preferences.</p>
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
