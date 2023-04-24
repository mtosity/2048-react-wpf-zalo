using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Media.Animation;

namespace M2048
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        //Main variables
        Block[,] blks = new Block[4, 4];
        Block[,] OldBlks = new Block[4, 4];
        int score, PrevScore;
        Button[,] Btns = new Button[4, 4];
        DoubleAnimation DAnimation;
        Storyboard SBoard;

        public MainWindow()
        {
            InitializeComponent();
            //Double animation settings
            DAnimation = new DoubleAnimation();
            DAnimation.From = 80;
            DAnimation.To = 40;
            DAnimation.Duration = TimeSpan.FromMilliseconds(250);
            //Story board
            SBoard = new Storyboard();
            SBoard.Children.Add(DAnimation);
            //New game
            NewGame();
        }
        private void NewGame()
        {
            //Default Score
            score = 0;
            //Create new blocks
            Block.InitNewGameBlocks(ref blks);
            Block.InitBlocks(ref OldBlks);
            Block.CoppyBlock(ref OldBlks, ref blks);
            //Display
            Score.Text = score.ToString();
            DrawNewBlock();
        }
        private void BackGame()
        {
            //Score
            score = PrevScore;
            //Chang back to old blocks
            Block.CoppyBlock(ref blks, ref OldBlks);
            //Update display
            Score.Text = score.ToString();
            DrawNewBlock();
        }
        private void LoadGame(Block[,] NewBlocks, int NewScore)
        {
            //Load score and blocks
            score = NewScore;
            Block.CoppyBlock(ref blks, ref NewBlocks);
            //Update display
            Score.Text = NewScore.ToString();
            DrawNewBlock();
        }
        private bool GameOver(Block[,] blks)
        {
            //Check is there a block zero (null block)
            for (int row=0;row<4;row++)
            {
                for(int col=0;col<4;col++)
                {
                    if (blks[row, col].num == 0)
                        return false;
                }
            }
            //Check every couples
            for (int row = 0; row < 4; row++)
            {
                for (int col = 0; col < 3; col++)
                {
                    if (blks[row, col].num == blks[row, col + 1].num)
                        return false;
                }
            }
            for (int col = 0; col < 4; col++)
            {
                for (int row = 0; row < 3; row++)
                {
                    if (blks[row + 1, col].num == blks[row, col].num)
                        return false;
                }
            }
            //You dead my friend
            return true;
        }
        private void GridClear()
        {
            //Clear all grid except the menu grid column (col = 4)
            for (int i = 0; i < mgrid.Children.Count; i++)
            {
                if ((Grid.GetColumn(mgrid.Children[i]) != 4))
                {
                    mgrid.Children.Remove(mgrid.Children[i]);
                }
            }
        }
        private void DrawNewBlock()
        {
            GridClear();
            for(int row = 0; row <4;row++)
            {
                for(int col = 0; col < 4; col++)
                {
                    //Button settings
                    Btns[row, col] = new Button();
                    Btns[row, col].BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("Gray"));
                    Btns[row, col].BorderThickness = new Thickness(3);
                    Btns[row, col].FontStretch = new FontStretch();
                    if (blks[row, col].num != 0) //If have tile (2, 4, 8,...) 
                    {
                        //Title buttons settings
                        Btns[row, col].Background = Block.GetTitleBlocksColor(blks[row, col]);
                        Btns[row, col].Content = blks[row, col].num.ToString();
                        Btns[row, col].FontSize = 40;

                        //Animation when new title appear and 2 titles combined
                        if (blks[row, col].Combined == true || blks[row, col].NewBlock == true)
                        {
                            Storyboard.SetTarget(DAnimation, Btns[row,col]);
                            Storyboard.SetTargetProperty(DAnimation, new PropertyPath(Button.FontSizeProperty));
                            SBoard.Begin(Btns[row,col]);
                        }                                    
                    }
                    else
                    {
                        //None title buttons settings
                        Btns[row, col].Background = Block.GetBlocksNoneTitleColor();
                    }
                    //Set it to the grid
                    Grid.SetColumn(Btns[row, col], col);
                    Grid.SetRow(Btns[row, col], row);
                    mgrid.Children.Add(Btns[row, col]);
                }
            }
        }

        private void MoveUp()
        {
            PrevScore = score;
            if (Block.TryUp(ref blks, ref OldBlks, ref score) == true)  //If blocks changed 
            {
                //Update blocks
                Block.GenerateABlock(ref blks);
                //Update display
                DrawNewBlock();
                Score.Text = score.ToString();
            }
        }
        private void MoveDown()
        {
            PrevScore = score;
            if (Block.TryDown(ref blks, ref OldBlks, ref score) == true)  //If blocks changed
            {
                //Update blocks
                Block.GenerateABlock(ref blks);
                //Update display
                DrawNewBlock();
                Score.Text = score.ToString();
            }
        }
        private void MoveLeft()
        {
            PrevScore = score;
            if (Block.TryLeft(ref blks, ref OldBlks, ref score) == true)  //If blocks changed
            {
                //Update blocks
                Block.GenerateABlock(ref blks);
                //Update display
                DrawNewBlock();
                Score.Text = score.ToString();
            }
        }
        private void MoveRight()
        {
            PrevScore = score;
            if (Block.TryRight(ref blks, ref OldBlks, ref score) == true)  //If blocks changed
            {
                //Update blocks
                Block.GenerateABlock(ref blks);
                //Update display
                DrawNewBlock();
                Score.Text = score.ToString();
            }
        }

        //Actions
        private void Mgrid_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.Key)
            {
                case Key.Up:
                    MoveUp();
                    break;
                case Key.Down:
                    MoveDown();
                    break;
                case Key.Right:
                    MoveRight();
                    break;
                case Key.Left:
                    MoveLeft();
                    break;
                default:
                    break;
            }
            if (GameOver(blks))
            {
                MessageBox.Show("Game over! Score: " + score.ToString(), "Notification");
            }
        }
        private void New_Click(object sender, RoutedEventArgs e)
        {
            NewGame();
        }
        private void Back_Click(object sender, RoutedEventArgs e)
        {
            BackGame();
        }
    }
}
