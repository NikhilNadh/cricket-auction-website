import { useMemo, useState } from "react";
import { useAuction } from "@/context/AuctionContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Search,
    Database,
    Plus,
    Check,
    Trash2
} from "lucide-react";

import { Player } from "@/types/auction";
import { getImageByCode } from "@/lib/imageUtils";

const PlayerDatabaseCard = () => {

    const {
        allPlayers,
        setAllPlayers,
        players,
        setPlayers,
    } = useAuction();

    const [search, setSearch] = useState("");

    const filteredPlayers = useMemo(() => {

        return allPlayers.filter(player =>
            player.name.toLowerCase().includes(search.toLowerCase())
        );

    }, [search, allPlayers]);

    const addToPool = (player: Player) => {

        const exists = players.some(p => p.id === player.id);

        if (exists) return;

        setPlayers(prev => [...prev, player]);

    };

    const removePlayer = (id: string) => {

        if (!confirm("Delete this player permanently?")) return;

        setAllPlayers(prev =>
            prev.filter(player => player.id !== id)
        );

        setPlayers(prev =>
            prev.filter(player => player.id !== id)
        );

    };

    const getRoleColor = (role: Player["role"]) => {

        switch (role) {

            case "Batsman":
                return "text-blue-400";

            case "Bowler":
                return "text-red-400";

            case "All-Rounder":
                return "text-purple-400";

            case "Wicket-Keeper":
                return "text-amber-400";

        }

    };

    return (

        <Card className="card-stadium">

            <CardHeader>

                <CardTitle className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <Database className="w-5 h-5 text-primary"/>

                        Player Database ({allPlayers.length})

                    </div>

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="relative mb-4">

                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground"/>

                    <Input

                        placeholder="Search players..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        className="pl-10"

                    />

                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">

                    {

                        filteredPlayers.length === 0 && (

                            <div className="text-center py-8 text-muted-foreground">

                                No Players Found

                            </div>

                        )

                    }

                    {

                        filteredPlayers.map(player=>{

                            const inPool = players.some(

                                p=>p.id===player.id

                            );

                            return(

                                <div

                                    key={player.id}

                                    className="border border-border rounded-lg p-3 flex items-center gap-3"

                                >

                                    {

                                        getImageByCode(player.imageCode)

                                        ?

                                        (

                                            <img

                                                src={getImageByCode(player.imageCode)!}

                                                className="w-10 h-10 rounded-full object-cover"

                                            />

                                        )

                                        :

                                        (

                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">

                                                {

                                                    player.name.charAt(0)

                                                }

                                            </div>

                                        )

                                    }

                                    <div className="flex-1">

                                        <div className="font-semibold">

                                            {player.name}

                                        </div>

                                        <div className="text-xs flex gap-2">

                                            <span className={getRoleColor(player.role)}>

                                                {player.role}

                                            </span>

                                            <span className="text-muted-foreground">

                                                ₹{player.basePrice}

                                            </span>

                                        </div>

                                    </div>

                                    {

                                        inPool

                                        ?

                                        <Button

                                            size="sm"

                                            disabled

                                        >

                                            <Check className="w-4 h-4 mr-2"/>

                                            Added

                                        </Button>

                                        :

                                        <Button

                                            size="sm"

                                            onClick={()=>addToPool(player)}

                                        >

                                            <Plus className="w-4 h-4 mr-2"/>

                                            Add

                                        </Button>

                                    }


                                    <Button

                                        size="icon"

                                        variant="destructive"

                                        onClick={()=>removePlayer(player.id)}

                                    >

                                        <Trash2 className="w-4 h-4"/>

                                    </Button>

                                </div>

                            )

                        })

                    }

                </div>

            </CardContent>

        </Card>

    );

};

export default PlayerDatabaseCard;