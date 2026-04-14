import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Volume2, Globe } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const languages = ["English", "हिन्दी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "মারাঠী"];

const botResponses: Record<string, string> = {
  dengue: "🦟 Dengue Prevention Tips:\n1. Remove stagnant water around your home\n2. Use mosquito repellent and nets\n3. Wear long sleeves during dusk/dawn\n4. Seek medical attention if you experience fever with body pain",
  air: "🌫️ Air Quality Advisory:\n1. Check AQI before outdoor activities\n2. Wear N95 mask when AQI > 150\n3. Use air purifiers indoors\n4. Avoid exercising outdoors during high pollution hours",
  water: "💧 Water Safety:\n1. Always boil drinking water during advisories\n2. Use water purifiers with RO+UV\n3. Report water contamination at your local ward office\n4. Store clean water in covered containers",
  heat: "🌡️ Heat Wave Safety:\n1. Stay indoors between 11 AM-4 PM\n2. Drink ORS and plenty of water\n3. Wear light, loose cotton clothing\n4. Check on elderly neighbors regularly",
  default: "👋 I'm SafeHub AI! Ask me about:\n• Dengue prevention\n• Air quality tips\n• Water safety\n• Heat wave precautions\n• Local health alerts\n\nI can also read alerts aloud in multiple Indian languages! 🔊"
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("dengue") || lower.includes("mosquito")) return botResponses.dengue;
  if (lower.includes("air") || lower.includes("pollution") || lower.includes("aqi")) return botResponses.air;
  if (lower.includes("water") || lower.includes("contamina")) return botResponses.water;
  if (lower.includes("heat") || lower.includes("temperature") || lower.includes("hot")) return botResponses.heat;
  return botResponses.default;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", text: botResponses.default }
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("English");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", text: getResponse(input) };
    setMessages(m => [...m, userMsg, botMsg]);
    setInput("");
  }

  function handleVoice(text: string) {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang === "हिन्दी" ? "hi-IN" : lang === "తెలుగు" ? "te-IN" : lang === "தமிழ்" ? "ta-IN" : lang === "ಕನ್ನಡ" ? "kn-IN" : lang === "মারাঠী" ? "mr-IN" : "en-IN";
      speechSynthesis.speak(utter);
    }
  }

  return (
    <Card className="border-0 shadow-lg flex flex-col h-[500px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> SafeHub AI
          </CardTitle>
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="text-xs bg-muted rounded-md px-2 py-1 border-0 text-foreground"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pt-0 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}>
              {m.text}
              {m.role === "bot" && (
                <button
                  onClick={() => handleVoice(m.text)}
                  className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors"
                >
                  <Volume2 className="h-3 w-3" /> Listen in {lang}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </CardContent>
      <div className="p-4 border-t border-border">
        <form
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about health alerts..."
            className="flex-1 bg-muted border-0"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
