import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "sk_omcvorv5_BpoR2qwjKsiyqZsp06bc7NxD"
});

const response = await client.text.translate({
    input: "my name is yaksh",
    source_language_code: "auto",
    target_language_code: "hi-IN",
    speaker_gender: "Male"
});

console.log(response.translated_text);
