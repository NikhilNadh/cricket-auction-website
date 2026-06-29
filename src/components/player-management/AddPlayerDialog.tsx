import { useState } from "react";
import { useAuction } from "@/context/AuctionContext";

import { Player } from "@/types/auction";
import { getImageByCode } from "@/lib/imageUtils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Plus,
    Image
} from "lucide-react";

const ROLES = [
    "Batsman",
    "Bowler",
    "All-Rounder",
    "Wicket-Keeper",
] as const;

const AddPlayerDialog = () => {

    const {
        allPlayers,
        setAllPlayers,
        basePrice,
    } = useAuction();

    const [open, setOpen] = useState(false);

    const [player, setPlayer] = useState({

        name: "",

        role: "Batsman" as Player["role"],

        imageCode: "",

    });

    const addPlayer = () => {

        if (!player.name.trim()) return;

        const alreadyExists = allPlayers.some(

            p =>
                p.name.toLowerCase() ===
                player.name.trim().toLowerCase()

        );

        if (alreadyExists) {

            alert("Player already exists.");

            return;

        }

        const newPlayer: Player = {

            id: `player-${Date.now()}`,

            name: player.name.trim(),

            role: player.role,

            imageCode: player.imageCode || undefined,

            basePrice,

            status: "available",

        };

        setAllPlayers(prev => [...prev, newPlayer]);

        setPlayer({

            name: "",

            role: "Batsman",

            imageCode: "",

        });

        setOpen(false);

    };

    return (

        <Dialog

            open={open}

            onOpenChange={setOpen}

        >

            <DialogTrigger asChild>

                <Button className="btn-auction">

                    <Plus className="w-4 h-4 mr-2"/>

                    Add Player

                </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <DialogTitle>

                        Add New Player

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    <div>

                        <Label>

                            Player Name

                        </Label>

                        <Input

                            value={player.name}

                            onChange={(e)=>

                                setPlayer(prev=>({

                                    ...prev,

                                    name:e.target.value,

                                }))

                            }

                        />

                    </div>

                    <div>

                        <Label>

                            Role

                        </Label>

                        <Select

                            value={player.role}

                            onValueChange={(value)=>

                                setPlayer(prev=>({

                                    ...prev,

                                    role:value as Player["role"]

                                }))

                            }

                        >

                            <SelectTrigger>

                                <SelectValue/>

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    ROLES.map(role=>(

                                        <SelectItem

                                            key={role}

                                            value={role}

                                        >

                                            {role}

                                        </SelectItem>

                                    ))

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <Label>

                            Image Code

                        </Label>

                        <Input

                            value={player.imageCode}

                            onChange={(e)=>

                                setPlayer(prev=>({

                                    ...prev,

                                    imageCode:e.target.value,

                                }))

                            }

                        />

                    </div>

                    {

                        player.imageCode &&

                        getImageByCode(player.imageCode) &&

                        (

                            <div className="flex justify-center">

                                <img

                                    src={getImageByCode(player.imageCode)!}

                                    className="w-24 h-24 rounded-full object-cover border"

                                />

                            </div>

                        )

                    }

                    <div className="flex justify-end gap-2">

                        <Button

                            variant="outline"

                            onClick={()=>setOpen(false)}

                        >

                            Cancel

                        </Button>

                        <Button

                            onClick={addPlayer}

                        >

                            Save Player

                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

};

export default AddPlayerDialog;