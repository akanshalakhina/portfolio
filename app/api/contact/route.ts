import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const submission = { name, email, message, timestamp };

    // 1. Save submission locally for local review & history (ONLY in development)
    if (process.env.NODE_ENV === "development") {
      try {
        const fs = await import("fs");
        const path = await import("path");
        const filePath = path.join(process.cwd(), "contact_submissions.json");
        let submissions = [];

        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          submissions = JSON.parse(fileContent);
        }
        submissions.push(submission);
        fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
      } catch (e) {
        console.error("Error writing contact_submissions.json in development:", e);
      }
    }

    // 2. Forward via Web3Forms API using the user provided Access Key
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "517baaf5-6b9d-4810-9de8-76db574f64d8",
        name: name,
        email: email,
        message: message,
        subject: `New Portfolio Message from ${name}`,
        from_name: "Portfolio Contact Desk"
      }),
    });

    const web3formsData = await web3formsResponse.json();

    if (web3formsResponse.ok && web3formsData.success) {
      return NextResponse.json({
        success: true,
        message: "Message recorded and sent successfully.",
        savedLocally: true,
        forwarded: true,
      });
    } else {
      console.error("Web3Forms error response:", web3formsData);
      return NextResponse.json({
        success: false,
        error: web3formsData.message || "Failed to forward email through Web3Forms API.",
        savedLocally: true,
        forwarded: false,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
