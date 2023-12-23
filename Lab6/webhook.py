import asyncio
import logging
import sys
import json
import random
from os import getenv

from aiogram import Bot, Dispatcher, Router, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.utils.markdown import hbold

# Bot token can be obtained via https://t.me/BotFather
TOKEN = getenv("TG_TOKEN")

# All handlers should be attached to the Router (or Dispatcher)
dp = Dispatcher()

with open('phrase.json', 'r') as f:
  phrase_data = json.load(f)

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"На старт, увага, руш")


@dp.message(Command("phrase"))
async def echo_handler(message: types.Message) -> None:
   random_phrase = random.choice(phrase_data)
   await message.answer(random_phrase)


async def main() -> None:
    # Initialize Bot instance with a default parse mode which will be passed to all API calls
    bot = Bot(TOKEN, parse_mode=ParseMode.HTML)
    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
