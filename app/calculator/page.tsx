'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('household')
  const [emissions, setEmissions] = useState({ household: 0, transportation: 0, lifestyle: 0 })
  const [totalEmissions, setTotalEmissions] = useState(0)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleCalculate = () => {
    const total = Object.values(emissions).reduce((sum, value) => sum + value, 0)
    setTotalEmissions(total)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-serif text-3xl text-[#5C4033]">Your Carbon Footprint</h1>
      <p className="mb-8 text-[#5C4033]/80">Welcome to Unnati's Emission Calculator! Calculate and log your emissions for today.</p>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#FFFBF5]">
          <TabsTrigger value="household" className="data-[state=active]:bg-[#556B2F] data-[state=active]:text-white">Household</TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-[#6B7A97] data-[state=active]:text-white">Transport</TabsTrigger>
          <TabsTrigger value="lifestyle" className="data-[state=active]:bg-[#FFB6A3] data-[state=active]:text-white">Lifestyle</TabsTrigger>
          <TabsTrigger value="log" className="data-[state=active]:bg-[#F4C430] data-[state=active]:text-white">Log</TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-[#5F9EA0] data-[state=active]:text-white">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="household">
          <Card>
            <CardHeader>
              <CardTitle>Household Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="electricity">Electricity Usage (kWh)</Label>
                  <Input id="electricity" type="number" placeholder="Enter kWh" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="gas">Natural Gas Usage (m³)</Label>
                  <Input id="gas" type="number" placeholder="Enter m³" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="water">Water Usage (L)</Label>
                  <Input id="water" type="number" placeholder="Enter L" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCalculate()}>Calculate</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transport">
          <Card>
            <CardHeader>
              <CardTitle>Transport Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="car">Car Travel (km)</Label>
                  <Input id="car" type="number" placeholder="Enter km" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="public-transport">Public Transport (km)</Label>
                  <Input id="public-transport" type="number" placeholder="Enter km" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="air-travel">Air Travel (km)</Label>
                  <Input id="air-travel" type="number" placeholder="Enter km" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCalculate()}>Calculate</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="local-food" />
                  <Label htmlFor="local-food">I ate locally sourced food</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="vegetarian" />
                  <Label htmlFor="vegetarian">I had a vegetarian diet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recycling" />
                  <Label htmlFor="recycling">I recycled my waste</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCalculate()}>Calculate</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Emissions Log</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalEmissions} kg CO₂</p>
              <p>Make sure your emissions cap does not exceed 30 kg CO₂ per day to unlock rewards!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Your Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Unlock rewards by keeping your daily emissions under 30 kg CO₂!</p>
              <Button className="mt-4">Unlock Rewards</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}