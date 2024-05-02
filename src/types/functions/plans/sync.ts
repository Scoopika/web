"use server";

import { configureLemonSqueezy } from '@/lib/lemonsqueezy';
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

export async function syncPlans() {
    configureLemonSqueezy();
}