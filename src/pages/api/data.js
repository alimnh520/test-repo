import { dbConnection } from "@/lib/connectDb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const collection = (await dbConnection()).collection('dcrpayments');
      const data = await collection.find({}).toArray();
      res.status(200).json({ message: data });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: 'Failed' });
    }
  }
}