import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth') // Enables JWT Bearer authorization lock in Swagger UI
@UseGuards(JwtAuthGuard)  // Protects ALL routes in this controller
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  createTask(@GetUser('id') userId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the logged-in user' })
  getUserTasks(@GetUser('id') userId: string) {
    return this.tasksService.getUserTasks(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  getTaskById(@GetUser('id') userId: string, @Param('id') taskId: string) {
    return this.tasksService.getTaskById(userId, taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  updateTask(
    @GetUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(userId, taskId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  deleteTask(@GetUser('id') userId: string, @Param('id') taskId: string) {
    return this.tasksService.deleteTask(userId, taskId);
  }
}