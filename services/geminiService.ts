import { GoogleGenAI, Type } from "@google/genai";
import { DashboardState, ScenarioType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDashboardSimulation = async (scenario: ScenarioType): Promise<DashboardState> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Generate a JSON object representing the state of a "Brand Reputation Dashboard" (VibeScore).
    The scenario is: ${scenario}.
    
    The "vibeScore" should be between 0-100.
    If Crisis, score is low (20-50). If Success, high (80-100). If Normal, (60-80).
    
    Include "sentimentHistory" array with 7 points (time labels like "10:00", "11:00" etc and score 0-100).
    Include "totalMentions" (number) and "reach" (string like "2.5M").
    
    "alerts" should be relevant to a social media manager.
    "platforms" should cover TikTok, Reddit, Google, Twitter. Provide 5 data points for sparklines for each platform.
    
    Return ONLY valid JSON conforming to the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.INTEGER },
            currentXP: { type: Type.INTEGER },
            maxXP: { type: Type.INTEGER },
            vibeScore: { type: Type.INTEGER },
            streak: { type: Type.INTEGER },
            totalMentions: { type: Type.INTEGER },
            reach: { type: Type.STRING },
            alerts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["CRITICAL", "WARNING", "SUCCESS"] },
                  message: { type: Type.STRING },
                  time: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  xp: { type: Type.INTEGER }
                }
              }
            },
            achievements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  xp: { type: Type.INTEGER },
                  icon: { type: Type.STRING }
                }
              }
            },
            platforms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  percentage: { type: Type.INTEGER },
                  trend: { type: Type.STRING, enum: ["up", "down"] },
                  data: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER }
                  }
                }
              }
            },
            sentimentHistory: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  score: { type: Type.INTEGER }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DashboardState;
    }
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Gemini simulation failed, using fallback", error);
    // Fallback data
    return {
      level: 7,
      currentXP: 2340,
      maxXP: 3000,
      vibeScore: 72,
      streak: 3,
      totalMentions: 1420,
      reach: "2.4M",
      alerts: [
        { id: '1', type: 'CRITICAL', message: 'Viral TikTok detected: 50K views in 30 minutes', time: '2 min ago', impact: '-12% sentiment', xp: 25 },
        { id: '2', type: 'WARNING', message: 'Reddit thread gaining traction', time: '15 min ago', impact: 'Monitoring' },
      ],
      achievements: [
        { name: 'Crisis Defender', xp: 150, icon: 'shield' },
        { name: 'Sentiment Booster', xp: 100, icon: 'trending-up' }
      ],
      platforms: [
        { name: 'TikTok', percentage: 34, trend: 'up', data: [20, 40, 35, 50, 80] },
        { name: 'Reddit', percentage: 22, trend: 'down', data: [60, 55, 40, 30, 22] },
        { name: 'Google', percentage: 18, trend: 'up', data: [15, 16, 16, 17, 18] },
        { name: 'Twitter', percentage: 15, trend: 'down', data: [30, 25, 20, 18, 15] }
      ],
      sentimentHistory: [
        { time: "10:00", score: 85 },
        { time: "11:00", score: 82 },
        { time: "12:00", score: 78 },
        { time: "13:00", score: 75 },
        { time: "14:00", score: 70 },
        { time: "15:00", score: 72 },
        { time: "16:00", score: 72 }
      ]
    };
  }
};