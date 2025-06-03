import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const studentsName = formData.get("studentsName") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `festival-booths/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("festivals")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    // Get the public URL of the uploaded image
    const {
      data: { publicUrl },
    } = supabase.storage.from("festivals").getPublicUrl(filePath);

    // Create festival record in database
    const festival = await prisma.festival.create({
      data: {
        title,
        studentsName,
        description,
        imageUrl: publicUrl,
      },
    });

    return NextResponse.json(festival);
  } catch (error) {
    console.error("Error creating festival:", error);
    return NextResponse.json(
      { error: "Failed to create festival booth" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const festivals = await prisma.festival.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(festivals);
  } catch (error) {
    console.error("Error fetching festivals:", error);
    return NextResponse.json(
      { error: "Failed to fetch festivals" },
      { status: 500 }
    );
  }
}
