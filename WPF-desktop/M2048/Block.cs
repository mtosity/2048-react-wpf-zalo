//using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Media;

namespace M2048
{
    class Block
    {
        //Block variables===============================================================
        public int num = 0;
        public bool Combined = false;
        public bool NewBlock = false;
        public enum Direction { Up = 1, Down = 2, Left = 3, Right = 4 }
        //Color======================================================================
        private static readonly SolidColorBrush Tile2 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EEE4DA"));
        private static readonly SolidColorBrush Tile4 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDE0C8"));
        private static readonly SolidColorBrush Tile8 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F2B179"));
        private static readonly SolidColorBrush Tile16 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F59563"));
        private static readonly SolidColorBrush Tile32 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F67C5F"));
        private static readonly SolidColorBrush Tile64 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F65E3B"));
        private static readonly SolidColorBrush Tile128 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDCF72"));
        private static readonly SolidColorBrush Tile256 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDCC61"));
        private static readonly SolidColorBrush Tile512 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDC850"));
        private static readonly SolidColorBrush Tile1024 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDC53F"));
        private static readonly SolidColorBrush Tile2048 = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EDC22E"));
        private static readonly SolidColorBrush TileSuper = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#3C3A32"));

        private static readonly SolidColorBrush Border = new SolidColorBrush((Color)ColorConverter.ConvertFromString("Black"));
        private static readonly SolidColorBrush NoneTitle = new SolidColorBrush((Color)ColorConverter.ConvertFromString("LightGray"));

        public static SolidColorBrush GetTitleBlocksColor(Block blk)
        {
            switch (blk.num)
            {
                case 2:
                    return Tile2;
                case 4:
                    return Tile4;
                case 8:
                    return Tile8;
                case 16:
                    return Tile16;
                case 32:
                    return Tile32;
                case 64:
                    return Tile64;
                case 128:
                    return Tile128;
                case 256:
                    return Tile256;
                case 512:
                    return Tile512;
                case 1024:
                    return Tile1024;
                case 2048:
                    return Tile2048;
                default:
                    return TileSuper;

            }
        }
        public static SolidColorBrush GetBlocksNoneTitleColor()
        {
            return NoneTitle;
        }

        //Support Methods=====================================================================
        private static int CountBlocksNumberZero(Block[,] blks)
        {
            int kq = 0;
            for (int row = 0; row < 4; row++)
                for (int col = 0; col < 4; col++)
                    if (blks[row, col].num == 0)
                        kq++;
            return kq;
        }
        private static List<int> ProcessList(ref List<int> ls, ref int score)  //If blocks changed, return the index which combined
        {
            List<int> result = new List<int>();
            //Combine numbers: 0202 -> 0400
            int front = 0, end = 1;
            while (end <= 3 && front <= 2)
            {
                if (ls[front] == 0)
                {
                    front++;
                    end = front + 1;
                }
                else if (ls[end] == 0)
                {
                    end++;
                }
                else
                {
                    if (ls[front] == ls[end]) //Found something to combine
                    {
                        //Add position that just combined
                        result.Add(front);
                        //Combine and update index
                        ls[front] = ls[front] * 2;
                        ls[end] = 0;
                        score = score + ls[front];
                        front++;
                        end = front + 1;
                    }
                    else
                    {
                        front++;
                        end = front + 1;
                    }
                }
            }
            //Process zeros: 0400 -> 4000
            int ZeroIndex = -1;
            //Maximun  3 numbers need to put to the top
            for (int i = 0; i < 4; i++)
            {
                if (ls[i] == 0)
                {
                    if (ZeroIndex == -1)
                        ZeroIndex = i;
                }
                else
                {
                    if (ZeroIndex != -1)
                    {
                        if (result.Contains(i))
                        {
                            result[result.IndexOf(i)] = ZeroIndex;
                        }
                        ls[ZeroIndex] = ls[i];
                        ls[i] = 0;
                        ZeroIndex = -1;
                        i = ZeroIndex + 1;
                        result.Add(-1);
                    }
                }
            }
            return result;
        }

        //Controller Methods===============================================================
        public static void GenerateABlock(ref Block[,] blks)
        {
            int k = Block.CountBlocksNumberZero(blks);
            var ran = new Random();
            int RanPos = ran.Next(0, k);
            int RanNum = ran.Next(1, 2) * 2;

            int temp_count = -1;
            for (int row = 0; row < 4; row++)
            {
                for (int col = 0; col < 4; col++)
                {
                    if (blks[row, col].num == 0)
                    {
                        temp_count++;
                        if (temp_count == RanPos)
                        {
                            blks[row, col].num = RanNum;
                            blks[row, col].NewBlock = true;
                        }
                    }
                }
            }
        }
        public static void InitBlocks(ref Block[,] blks)
        {
            for (int row = 0; row < 4; row++)
                for (int col = 0; col < 4; col++)
                    blks[row, col] = new Block();
        }
        public static void InitNewGameBlocks(ref Block[,] blks)
        {
            InitBlocks(ref blks);
            GenerateABlock(ref blks);
            GenerateABlock(ref blks);
        }
        public static bool TryUp(ref Block[,] blks, ref Block[,] OldBlocks, ref int score) //If blocks changed, return true
        {
            //Create a temp blocks to store untouched blks
            Block[,] TempBlocks = new Block[4, 4];
            InitBlocks(ref TempBlocks);
            CoppyBlock(ref TempBlocks, ref blks);

            bool BlocksChanged = false;
            for (int col = 0; col < 4; col++)
            {
                List<int> ls = new List<int>();
                for (int row = 0; row < 4; row++)
                {
                    ls.Add(blks[row, col].num);
                    //reset combined and newblock
                    blks[row, col].Combined = false;
                    blks[row, col].NewBlock = false;
                }
                List<int> ChangedList = ProcessList(ref ls, ref score);
                if (ChangedList.Count != 0) // If blocks changed
                {
                    BlocksChanged = true;
                    //Tell that block has combined (*Different for each action: up down left right)
                    int l_ls = ChangedList.Count;
                    for (int i = 0; i < l_ls; i++)
                    {
                        if (ChangedList[i] != -1)
                            blks[ChangedList[i], col].Combined = true;
                    }
                    //Update blocks
                    int ls_k = 0;
                    for (int row = 0; row < 4; row++) //(*Different for each action: up down left right)
                    {
                        blks[row, col].num = ls[ls_k];
                        ls_k++;
                    }
                    ls.Clear();
                }
            }

            if (BlocksChanged == true)//If blocks changed then update oldblocks and set every blocks to not new
            {
                CoppyBlock(ref OldBlocks, ref TempBlocks);
            }
            return BlocksChanged;
        }
        public static bool TryDown(ref Block[,] blks, ref Block[,] OldBlocks, ref int score) //If blocks changed, return true
        {
            //Create a temp blocks to store Untouched blks
            Block[,] TempBlocks = new Block[4, 4];
            InitBlocks(ref TempBlocks);
            CoppyBlock(ref TempBlocks, ref blks);

            bool BlocksChanged = false;
            for (int col = 0; col < 4; col++)
            {
                List<int> ls = new List<int>();
                for (int row = 3; row >= 0; row--)
                {
                    ls.Add(blks[row, col].num);
                    //Set all blocks combined to false
                    blks[row, col].Combined = false;
                    blks[row, col].NewBlock = false;
                }
                List<int> ChangedList = ProcessList(ref ls, ref score);
                if (ChangedList.Count != 0) // If blocks changed
                {
                    BlocksChanged = true;
                    //Tell that block has combined (*Different for each action: up down left right)
                    int l_ls = ChangedList.Count;
                    for (int i = 0; i < l_ls; i++)
                    {
                        if (ChangedList[i] != -1)
                            blks[3 - ChangedList[i], col].Combined = true;
                    }
                    int ls_k = 0;
                    for (int row = 3; row >= 0; row--)
                    {
                        blks[row, col].num = ls[ls_k];
                        ls_k++;
                    }
                }
                ls.Clear();
            }

            if (BlocksChanged == true)//If blocks changed then update oldblocks and set every blocks to not new
            {
                CoppyBlock(ref OldBlocks, ref TempBlocks);
            }
            return BlocksChanged;
        }
        public static bool TryLeft(ref Block[,] blks, ref Block[,] OldBlocks, ref int score) //If blocks changed, return true
        {
            //Create a temp blocks to store Untouched blks
            Block[,] TempBlocks = new Block[4, 4];
            InitBlocks(ref TempBlocks);
            CoppyBlock(ref TempBlocks, ref blks);

            bool BlocksChanged = false;
            for (int row = 0; row < 4; row++)
            {
                List<int> ls = new List<int>();
                for (int col = 0; col < 4; col++)
                {
                    ls.Add(blks[row, col].num);
                    //Set all blocks combined to false
                    blks[row, col].Combined = false;
                    blks[row, col].NewBlock = false;
                }
                List<int> ChangedList = ProcessList(ref ls, ref score);
                if (ChangedList.Count != 0) // If blocks changed
                {
                    BlocksChanged = true;
                    //Tell that block has combined (*Different for each action: up down left right)
                    int l_ls = ChangedList.Count;
                    for (int i = 0; i < l_ls; i++)
                    {
                        if (ChangedList[i] != -1)
                            blks[row, ChangedList[i]].Combined = true;
                    }
                    int ls_k = 0;
                    for (int col = 0; col < 4; col++)
                    {
                        //Set animation if necessary 
                        blks[row, col].num = ls[ls_k];
                        ls_k++;
                    }
                    ls.Clear();
                }
            }

            if (BlocksChanged == true)//If blocks changed then update oldblocks and set every blocks to not new
            {
                CoppyBlock(ref OldBlocks, ref TempBlocks);
            }
            return BlocksChanged;
        }
        public static bool TryRight(ref Block[,] blks, ref Block[,] OldBlocks, ref int score) //If blocks changed, return true
        {
            //Create a temp blocks to store Untouched blks
            Block[,] TempBlocks = new Block[4, 4];
            InitBlocks(ref TempBlocks);
            CoppyBlock(ref TempBlocks, ref blks);

            bool BlocksChanged = false;
            for (int row = 0; row < 4; row++)
            {
                List<int> ls = new List<int>();
                for (int col = 3; col >= 0; col--)
                {
                    ls.Add(blks[row, col].num);
                    //Set all blocks combined to false
                    blks[row, col].Combined = false;
                    blks[row, col].NewBlock = false;
                }
                List<int> ChangedList = ProcessList(ref ls, ref score);
                if (ChangedList.Count != 0) // If blocks changed
                {
                    BlocksChanged = true;
                    //Tell that block has combined (*Different for each action: up down left right)
                    int l_ls = ChangedList.Count;
                    for (int i = 0; i < l_ls; i++)
                    {
                        if (ChangedList[i] != -1)
                            blks[row, 3 - ChangedList[i]].Combined = true;
                    }
                    int ls_k = 0;
                    for (int col = 3; col >= 0; col--)
                    {
                        //Set animation if necessary 
                        blks[row, col].num = ls[ls_k];
                        ls_k++;
                    }
                    ls.Clear();
                }
            }

            if (BlocksChanged == true)//If blocks changed then update oldblocks and set every blocks to not new
            {
                CoppyBlock(ref OldBlocks, ref TempBlocks);
            }
            return BlocksChanged;
        }
        public static void CoppyBlock(ref Block[,] DesBlks, ref Block[,] SouBlks)
        {
            for (int row = 0; row < 4; row++)
            {
                for (int col = 0; col < 4; col++)
                {
                    DesBlks[row, col].num = SouBlks[row, col].num;
                    DesBlks[row, col].Combined = SouBlks[row, col].Combined;
                    DesBlks[row, col].NewBlock = SouBlks[row, col].NewBlock;
                }
            }
        }
    }
}
